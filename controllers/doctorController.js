import doctorModel from "./../model/doctorModel.js";

export const doctorProfileInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.find({ userId: req.body.userId });
    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    res.status(201).send({
      success: true,
      message: "Doctor fetches succefully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Cant get the doctor data",
      error,
    });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Doctor Profile Updated",
      });
    }
    res.status(201).send({
      success: true,
      message: "Doctor profile didnt updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Can't fetched",
      error,
    });
  }
};

export const getSingleDoctorController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Single doctor Info not found",
      });
    }
    res.status(201).send({
      success: true,
      message: "Single doctor info fetched",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Can't fetched",
      error,
    });
  }
};
