import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoBagCheckOutline } from "react-icons/io5";
import { MyContext } from "../../App";
import { fetchDataFromApi, postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [formFields, setFormFields] = useState({
    fullName: "",
    country: "",
    streetAddressLine1: "",
    streetAddressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    email: "",
  });

  const [cartData, setCartData] = useState([]);
  const [totalAmount, setTotalAmount] = useState();
  const context = useContext(MyContext);
  const history = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    context.setEnableFilterTab(false);

    const user = JSON.parse(localStorage.getItem("user"));
    fetchDataFromApi(`/api/cart?userId=${user?.userId}`).then((res) => {
      setCartData(res);
      setTotalAmount(
        res.length !== 0 &&
          res
            .map((item) => parseInt(item.price) * item.quantity)
            .reduce((total, value) => total + value, 0)
      );
    });
  }, []);

  const onChangeInput = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };

  const checkout = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "fullName",
      "country",
      "streetAddressLine1",
      "streetAddressLine2",
      "city",
      "state",
      "zipCode",
      "phoneNumber",
      "email",
    ];

    for (let field of requiredFields) {
      if (formFields[field] === "") {
        return context.setAlertBox({
          open: true,
          error: true,
          msg: `Please fill ${field.replace(/([A-Z])/g, " $1")}`,
        });
      }
    }

    const user = JSON.parse(localStorage.getItem("user"));

    const payLoad = {
      amount: totalAmount,
      userId: user.userId,
      email: formFields.email,
      phone: formFields.phoneNumber,
      name: formFields.fullName,
    };

    try {
      const res = await postData("/api/cashfree-token", payLoad);
      const paymentSessionId = res?.payment_session_id;

      if (!paymentSessionId) {
        return context.setAlertBox({
          open: true,
          error: true,
          msg: "Payment session creation failed.",
        });
      }

      // ✅ Correct Cashfree Drop-in integration
      if (window.Cashfree && window.Cashfree.initialiseDropin) {
        window.Cashfree.initialiseDropin({
          paymentSessionId: paymentSessionId,
          redirectTarget: "_self",
        });
      } else {
        context.setAlertBox({
          open: true,
          error: true,
          msg: "Cashfree Drop-in script not loaded.",
        });
      }
    } catch (err) {
      console.error("Cashfree token error:", err);
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Something went wrong with payment initiation.",
      });
    }
  };

  return (
    <section className="section">
      <div className="container">
        <form className="checkoutForm" onSubmit={checkout}>
          <div className="row">
            <div className="col-md-8">
              <h2 className="hd">BILLING DETAILS</h2>

              <div className="row mt-3">
                <div className="col-md-6">
                  <TextField
                    label="Full Name *"
                    variant="outlined"
                    className="w-100"
                    size="small"
                    name="fullName"
                    onChange={onChangeInput}
                  />
                </div>
                <div className="col-md-6">
                  <TextField
                    label="Country *"
                    variant="outlined"
                    className="w-100"
                    size="small"
                    name="country"
                    onChange={onChangeInput}
                  />
                </div>
              </div>

              <h6>Street address *</h6>
              <TextField
                label="House number and street name"
                variant="outlined"
                className="w-100 mt-2"
                size="small"
                name="streetAddressLine1"
                onChange={onChangeInput}
              />
              <TextField
                label="Apartment, suite, unit, etc. (optional)"
                variant="outlined"
                className="w-100 mt-2"
                size="small"
                name="streetAddressLine2"
                onChange={onChangeInput}
              />

              <h6 className="mt-3">Town / City *</h6>
              <TextField
                label="City"
                variant="outlined"
                className="w-100"
                size="small"
                name="city"
                onChange={onChangeInput}
              />

              <h6 className="mt-3">State / County *</h6>
              <TextField
                label="State"
                variant="outlined"
                className="w-100"
                size="small"
                name="state"
                onChange={onChangeInput}
              />

              <h6 className="mt-3">Postcode / ZIP *</h6>
              <TextField
                label="ZIP Code"
                variant="outlined"
                className="w-100"
                size="small"
                name="zipCode"
                onChange={onChangeInput}
              />

              <div className="row mt-3">
                <div className="col-md-6">
                  <TextField
                    label="Phone Number"
                    variant="outlined"
                    className="w-100"
                    size="small"
                    name="phoneNumber"
                    onChange={onChangeInput}
                  />
                </div>
                <div className="col-md-6">
                  <TextField
                    label="Email Address"
                    variant="outlined"
                    className="w-100"
                    size="small"
                    name="email"
                    onChange={onChangeInput}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card orderInfo">
                <h4 className="hd">YOUR ORDER</h4>
                <div className="table-responsive mt-3">
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartData?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            {item?.productTitle?.substr(0, 20) + "..."}{" "}
                            <b>× {item?.quantity}</b>
                          </td>
                          <td>
                            {item?.subTotal?.toLocaleString("en-US", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </td>
                        </tr>
                      ))}

                      <tr>
                        <td>Subtotal</td>
                        <td>
                          {(totalAmount || 0).toLocaleString("en-US", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <Button type="submit" className="btn-blue bg-red btn-lg btn-big">
                  <IoBagCheckOutline /> &nbsp; Checkout
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
