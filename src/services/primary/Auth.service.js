import JwtHelper from "../../helpers/JWT.helper.js";
import UserModel from "../../models/User.model.js";


class AuthService{
  constructor(server){
    this.server = server;

    this.UserModel = new UserModel(this.server).table;
    this.JwtHelper = new JwtHelper(this.server);
  }

  async createAccount(data) {
    const userModeData = await this.UserModel.findOne({
      where: {
        username: data.username
      }
    });

    if(userModeData !== null) return -1;

    const addUserModel = await this.UserModel.create({
      name: data.name,
      username: data.username,
      password: data.password,
      role: data.role
    })
    
    return 1;
  }

  async login(data, rememberMe) {
    const getDataUserModel = await this.UserModel.findOne({ where: {username: data.username} });

    if(getDataUserModel === null) return -1;

    if(rememberMe === "true") return this.JwtHelper.generateWithRefreshToken({ role: getDataUserModel.dataValues.role, username: getDataUserModel.dataValues.username })

    return this.JwtHelper.generateToken({ role: getDataUserModel.dataValues.role, username: getDataUserModel.dataValues.username});
  }

  async refreshToken(tokenData, refreshToken){
    return this.JwtHelper.refreshTokenValidation(tokenData, refreshToken);
  }

  async tokenCheck(username){
    const getDataUserModel = await this.UserModel.findOne({
      where: {
        username
      }
    })

    if(getDataUserModel === null) return -1;

    return{
      username: getDataUserModel.dataValues.username,
      role: getDataUserModel.dataValues.role
    }
  }
} 

export default AuthService