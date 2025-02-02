import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { message, Form, Col, Input, TimePicker, Row } from "antd";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import moment from "moment";
import { valueOf } from "./../../../node_modules/moment/src/lib/moment/to-type";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);

  //form Handler which will update the doctor profile
  const formHandler = async (values) => {
    try {
      //console.log("doctor info" + values);
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/doctor/updateDoctorProfile",
        {
          ...values,
          userId: user._id,
          timing: [
            moment(values.timing[0]).format("HH:mm"),
            moment(values.timing[1]).format("HH:mm"),
          ],
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.success);
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong !!");
    }
  };

  const doctorInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getAllDoctorInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        setDoctor(res.data.data[0]);
      } else {
        message.error("Something went wrong in profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    doctorInfo();
  }, []);
  return (
    <Layout>
      <h1>Profile</h1>
      {doctor && (
        <Form
          layout="vertical"
          className="m-4"
          initialValues={{
            ...doctor,
            timing: [
              moment(doctor.timing[0], "HH:mm"),
              moment(doctor.timing[1], "HH:mm"),
            ],
          }}
          onFinish={formHandler}
        >
          <h6 className="m-4">Personnel Details :</h6>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="FirstName" name="firstName">
                <Input type="text" placeholder="Write your first name..." />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="LastName" name="lastName">
                <Input type="text" placeholder="Write your last name..." />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Phone-Number" name="phoneNumber">
                <Input type="Number" placeholder="Write your phonenumber..." />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Email" name="email">
                <Input type="text" placeholder="Write your email..." />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Address" name="address">
                <Input type="text" placeholder="Write your address..." />
              </Form.Item>
            </Col>
          </Row>

          <h6 className="m-4">Professional Details :</h6>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Specialization" name="specialization">
                <Input type="text" placeholder="Write your specialization..." />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Website" name="website">
                <Input type="text" placeholder="Write your website..." />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Fee Per Consultation" name="feePerConsultation">
                <Input type="Number" placeholder="Consultency..." />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Experience" name="experience">
                <Input type="text" placeholder="Write your experience..." />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Timing" name="timing">
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>
          </Row>
          <button className="btn btn-primary d-flex justify-content-end">
            Update
          </button>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;
