const User = require('../models/user')
const emailVerificationToken = require('../models/emailVerificationToken')
const passwordResetToken = require('../models/passwordResetToken')
const {isValidObjectId} = require("mongoose");
const {generateOTP, generateMailTransporter} = require("../utils/mail");
const {sendError, generateRandomByte} = require("../utils/helper");
const jwt = require("jsonwebtoken");


class UserConrtoller {
    async createUser(req,res) {
        const {name,email,password} = req.body;

        const candidate = await User.findOne({email})
        if(candidate) return sendError(res,"This email is already in use!")

        const newUser = new User({name,email,password})
        await newUser.save()

        let OTP = generateOTP()

        const newEmailVerificationToken = new emailVerificationToken({owner:newUser._id,token:OTP})

        await newEmailVerificationToken.save()

        const transport = generateMailTransporter()

        transport.sendMail({
            from:'verification@manhattan.com',
            to:newUser.email,
            subject:'Email Verification',
            html:`
                <p>Your verification OTP</p>
                <h1>${OTP}</h1>
            `
        })

        res.status(201).json({
            user:{
                id:newUser._id,
                name:newUser.name,
                email:newUser.email
            }
        })
    }
    async verifyEmail(req,res){
        const {userId,OTP} = req.body;
        if(!isValidObjectId(userId)) return res.json({error:"Invalid user!"})

        const user = await User.findById(userId)
        if(!user) return sendError(res,"User not found!",404)
        if(user.isVerified) return sendError(res,"User is already verified!")

        const token = await emailVerificationToken.findOne({owner:userId})

        if(!token) sendError(res,"Token not found!")

        const isMatched = await token.compareToken(OTP);
        if(!isMatched) return sendError(res,"Please submit a valid OTP!")

        user.isVerified = true;
        await user.save()

        emailVerificationToken.findByIdAndDelete(token._id)

        const transport = generateMailTransporter()

        transport.sendMail({
            from:'verification@manhattan.com',
            to:user.email,
            subject:'WElCOME',
            html:`
                <h1>Welcome to our app and thanks for choosing us.</h1>
            `
        })
        const JWTtoken = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'24h'})

        res.json({
            user:{id:user._id,name:user.name,email:user.email,token:JWTtoken,isVerified:user.isVerified,role:user.role},
            message: "Your email is verified."
        })
    }
    async resendEmailVerificationToken(req,res) {
        const {userId} = req.body;

        const user = await User.findById(userId)
        if(!user) return sendError(res,"User not found!");

        if(user.isVerified)  return sendError(res,"User is already verified!")

        const token = await emailVerificationToken.findOne({owner:userId})
        if(token) return sendError(res,"Only after one hour you can request another token!");

        let OTP = generateOTP()

        const newEmailVerificationToken = new emailVerificationToken({owner:user._id,token:OTP})

        await newEmailVerificationToken.save()

        const transport = generateMailTransporter()

        transport.sendMail({
            from:'verification@manhattan.com',
            to:user.email,
            subject:'Email Verification',
            html:`
                <p>Your verification OTP</p>
                <h1>${OTP}</h1>
            `
        })
        res.status(201).json({ message: "New OTP has been sent to your registered email." })
    }
    async forgetPassword(req,res) {
        const {email} = req.body;

        if(!email) return sendError(res,'Email is missing!');

        const user = await User.findOne({email})
        if(!user) return sendError(res,'User not found!',404)

        const alreadyHasToken = await passwordResetToken.findOne({owner:user._id})
        if(alreadyHasToken) return sendError(res,'Only after one hour you can request another token!')

        const token = await generateRandomByte()
        const newPasswordResetToken = await passwordResetToken({owner:user._id,token})
        await newPasswordResetToken.save()

        const resetPasswordUrl = `http://localhost:3000/auth/reset-password?token=${token}&id=${user._id}`;
        const transport = generateMailTransporter()

        transport.sendMail({
            from:'verification@manhattan.com',
            to:user.email,
            subject:'Reset Password Link',
            html:`
                <p>Click here to reset password</p>
                <a href='${resetPasswordUrl}'>Change Password</a>
            `,
        });

        res.json({ message: "Link sent to your email!" });
    }
    async sendResetPasswordTokenStatus(req,res) {
        res.json({valid:true})
    }
    async resetPassword(req,res) {
        const {newPassword,userId} = req.body;

        const user = await User.findById(userId);
        const matched = await user.comparePassword(newPassword)
        if(matched) return sendError(res,'The new password must be different from the old one!')
        user.password = newPassword;
        await user.save()

        await passwordResetToken.findByIdAndDelete(req.resetToken._id)

        const transport = generateMailTransporter()

        transport.sendMail({
            from:'verification@manhattan.com',
            to:user.email,
            subject: "Password Reset Successfully",
            html: `
                 <h1>Password Reset Successfully</h1>
                 <p>Now you can use new password.</p>

            `,
        });
        res.json({
            message: "Password reset successfully, now you can use new password.",
        });
    }
    async signIn(req,res,next){
            const {email,password} = req.body;

            const user = await User.findOne({email})
            if(!user) return sendError(res,'Email/Password mismatch!')

            const matched = await user.comparePassword(password)
            if(!matched) return sendError(res,'Email/Password mismatch!')

            const {_id,name,role,isVerified} = user;

            const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'24h'})

            res.json({user:{id:_id,name,email,role,token,isVerified}})
    }
}

module.exports = new UserConrtoller()
