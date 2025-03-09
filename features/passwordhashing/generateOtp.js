function generateOtp() {
  let max = 999999;
  let min = 100000;
  let otp = Math.floor(Math.random() * (max - min) + min);
  console.log(otp);
  return otp;
}

export default generateOtp;
