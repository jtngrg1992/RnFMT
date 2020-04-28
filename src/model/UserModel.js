
class UserModel {
  constructor(
    id,
    fullName,
    email,
    gpa,
    height,
    parent,
    password,
    phone,
    testScore,
  ) {
    if (id) {
      this.id = Number(id);
    }
    this.fullName = fullName;
    this.email = email;
    this.gpa = Number(gpa);
    this.height = Number(height);
    this.parent = parent;
    this.password = password;
    this.phone = phone;
    this.testScore = Number(testScore);
  }

}

export default UserModel;
