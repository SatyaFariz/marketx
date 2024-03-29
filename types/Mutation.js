const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean
} = require('graphql')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const cloudinary = require('../lib/cloudinary')
const { uploader } = cloudinary.v2
const { isEmail } = require('validator')
const { GraphQLEmail } = require('graphql-custom-types')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const telegramBot = require('../lib/telegram')

const PostModel = require('../database/models/Post')
const UserModel = require('../database/models/User')
const CategoryModel = require('../database/models/Category')
const ProductModel = require('../database/models/Product')
const AttributeModel = require('../database/models/Attribute')
const OtpCodeModel = require('../database/models/OtpCode')
const VerificationModel = require('../database/models/Verification')
const StoreModel = require('../database/models/Store')
const TokenModel = require('../database/models/Token')
const ActionInfo = require('./ActionInfo')
const UserActionEnum = require('./UserActionEnum')
const SendVerificationCodePayload = require('./SendVerificationCodePayload')
const ActionOnUserPayload = require('./ActionOnUserPayload')
const UpdateProfileInput = require('./UpdateProfileInput')
const ActionOnStorePayload = require('./ActionOnStorePayload')
const AddressInput = require('./AddressInput')
const ProductInput = require('./ProductInput')
const ActionOnProductPayload = require('./ActionOnProductPayload')
const ProductTypeEnum = require('./ProductTypeEnum')
const ActionOnCategoryPayload = require('./ActionOnCategoryPayload')
const UpdateCategoryInput = require('./UpdateCategoryInput')
const { bulkUpload, singleUpload } = require('../utils/upload')

const telegramChatIds = [998703948]

module.exports = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    hash: {
      type: GraphQLString,
      args: {
        string: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { string }) => await bcrypt.hash(string, 10)
    },
    sendTelegramMessage: {
      type: GraphQLString,
      args: {
        chatId: { type: new GraphQLNonNull(GraphQLString) },
        message: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { chatId, message }) => {
        telegramBot.sendMessage(998703948, message)
      }
    },
    addIcon: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        url: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { id, url }) => {
        const _id = mongoose.Types.ObjectId(id)
        await CategoryModel.updateOne({ _id }, {
          $set: {
            'icons': [
              {
                _id: uuidv4(),
                url,
                width: 500,
                height: 500,
                bytes: 0,
                format: 'jpg',
                display: 0
              }
            ],
          }
        })
        return 'TEST'
      }
    },
    setProductImage: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        url: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { id, url }) => {
        const _id = mongoose.Types.ObjectId(id)
        await ProductModel.updateOne({ _id }, {
          $set: {
            'images': [
              {
                _id: uuidv4(),
                url,
                width: 500,
                height: 500,
                bytes: 0,
                format: 'jpg',
                display: 0
              },
              {
                _id: uuidv4(),
                url,
                width: 500,
                height: 500,
                bytes: 0,
                format: 'jpg',
                display: 0
              },
              {
                _id: uuidv4(),
                url,
                width: 500,
                height: 500,
                bytes: 0,
                format: 'jpg',
                display: 0
              }
            ],
          }
        })
        return 'TEST'
      }
    },

    setAttributeIcon: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        url: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { id, url }) => {
        const _id = mongoose.Types.ObjectId(id)
        await AttributeModel.updateOne({ _id }, {
          $set: {
            'icons': [
              {
                _id: uuidv4(),
                url,
                width: 500,
                height: 500,
                bytes: 0,
                format: 'jpg',
                display: 0
              }
            ],
          }
        })
        return 'TEST'
      }
    },

    updateDescription: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        desc: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { id, desc }) => {
        const _id = mongoose.Types.ObjectId(id)
        await ProductModel.updateOne({ _id }, {
          desc
        })
        return 'TEST'
      }
    },

    addSpec: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        attributeId: { type: new GraphQLNonNull(GraphQLString) },
        value: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { id, attributeId, value }) => {
        const _id = mongoose.Types.ObjectId(id)
        await ProductModel.updateOne({ _id }, {
          $push: {
            specs: {
              attributeId,
              value
            }
          }
        })
        return 'TEST'
      }
    },

    sendOtpCode: {
      type: SendVerificationCodePayload,
      args: {
        mobileNumber: { type: new GraphQLNonNull(GraphQLString) },
        action: { type: UserActionEnum }
      },
      resolve: async (_, { mobileNumber, action }, { session: { user: loggedUser }}) => {
        const query = action === 'edit_profile' ? {
          mobileNumber,
          _id: {
            $ne: loggedUser?.id
          }
        } : { mobileNumber }

        const data = await Promise.all([
          UserModel.findOne(query),
          OtpCodeModel.findOne({ mobileNumber })
        ])

        const [user, otp] = data

        if(!user && action === 'login') {
          return {
            actionInfo: {
              hasError: true,
              message: 'This number is not registered in our system yet.'
            }
          }
        } else if((user && action === 'register') || (user && action === 'edit_profile')) {
          return {
            actionInfo: {
              hasError: true,
              message: 'This number has already been registered.'
            }
          }
        } else if(otp) {
          const maxAttemptsPerDay = 5
          const now = new Date()
          if(Math.abs(now - otp.firstAttemptTimestamp) / 36e5 <= 24 && otp.attempts === maxAttemptsPerDay) {
            return {
              actionInfo: {
                hasError: true,
                message: `You can only send OTP code up to ${maxAttemptsPerDay} times within 24 hours.`
              }
            }
          } else if(now < otp.cooldownExpiry) {
            return {
              actionInfo: {
                hasError: true,
                message: `You have 1 minute until you can resend another OTP code.`
              }
            }
          } else {
            const now = new Date()
            const minutesUntilExpires = 5
            const minutesUntilCanResend = 1.5
            if(otp.attempts === maxAttemptsPerDay) {
              otp.attempts = 1
              otp.firstAttemptTimestamp = now
            } else {
              otp.attempts = otp.attempts + 1
            }
            otp.code = '1234'
            otp.lastAttemptTimestamp = now
            otp.cooldownExpiry = new Date(now.getTime() + minutesUntilCanResend * 60000)
            otp.expiry = new Date(now.getTime() + minutesUntilExpires * 60000)

            const newOtp = await otp.save()

            return {
              actionInfo: {
                hasError: false,
                message: `We have sent 4-digit OTP code to your number.`
              },
              expiry: newOtp.expiry,
              cooldownExpiry: newOtp.cooldownExpiry
            }
          }

        } else {
          const now = new Date()
          const minutesUntilExpires = 5
          const minutesUntilCanResend = 1.5
          const newOtp = await new OtpCodeModel({
            mobileNumber,
            code: '1234',
            firstAttemptTimestamp: now,
            lastAttemptTimestamp: now,
            attempts: 1,
            cooldownExpiry: new Date(now.getTime() + minutesUntilCanResend * 60000),
            expiry: new Date(now.getTime() + minutesUntilExpires * 60000)
          }).save()

          return {
            actionInfo: {
              hasError: false,
              message: `We have sent 4-digit OTP code to your number.`
            },
            expiry: newOtp.expiry,
            cooldownExpiry: newOtp.cooldownExpiry
          }
        }
      }
    },

    changePassword: {
      type: ActionInfo,
      args: {
        currentPassword: { type: new GraphQLNonNull(GraphQLString) },
        newPassword: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { currentPassword, newPassword }, { session: { user }}) => {
        if(user) {
          const loggedUser = await UserModel.findById(user.id)
          if((await bcrypt.compare(currentPassword, loggedUser.password))) {

            if(await bcrypt.compare(newPassword, loggedUser.password)) {
              return {
                hasError: true,
                message: 'New password must be different from your current password.'
              }
            }
            
            loggedUser.password = await bcrypt.hash(newPassword, 10)
            await loggedUser.save()

            return {
              hasError: false,
              message: 'Password successfully changed.'
            }
          }

          return {
            hasError: true,
            message: "Current password doesn't match your password."
          }
        }
      }
    },

    sendVerificationCode: {
      type: SendVerificationCodePayload,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        action: { type: UserActionEnum }
      },
      resolve: async (_, { id, action }) => {
        const now = new Date()
        if(isEmail(id)) {
          const code = Math.floor(100000 + Math.random() * 900000).toString()
          const verification = await VerificationModel.findOneAndUpdate(
            { 
              id 
            },
            {
              code,
              expiry: new Date(now.getTime() + 60 * 60000) // 60 minutes
            },
            {
              new: true,
              upsert: true
            }
          )

          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GMAIL,
              pass: process.env.GMAIL_PASSWORD
            }
          })
          
          const mailOptions = {
            from: process.env.GMAIL,
            to: id,
            subject: 'Email Confirmation Code',
            text: `This is your email confirmation code: ${code}`
          }
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error)
            } else {
              console.log('Email sent: ' + info.response)
            }
          })


          return {
            actionInfo: {
              hasError: false,
              message: `We have sent ${verification.code.length} digit code to ${id}`
            }
          }
        }
      }
    },

    requestPasswordResetLink: {
      type: ActionInfo,
      args: {
        email: { type: new GraphQLNonNull(GraphQLEmail) }
      },
      resolve: async (_, { email }) => {
        const user = await UserModel.findOne({ email })
        if(!user) {
          return {
            hasError: true,
            message: 'This email is not registered in our system yet.'
          }
        }

        const now = new Date()
        const resetToken = crypto.randomBytes(32).toString('hex')
        const hash = await bcrypt.hash(resetToken, 10)
        const expiry = new Date(now.getTime() + 60 * 60000) // 60 minutes

        await TokenModel.findOneAndUpdate(
          { 
            userId: user._id 
          },
          {
            token: hash,
            expiry
          },
          {
            new: true,
            upsert: true
          }
        )

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL,
            pass: process.env.GMAIL_PASSWORD
          }
        })

        const link = `${process.env.APP_URL}/reset-password?id=${user._id.toString()}&token=${resetToken}`
        
        const mailOptions = {
          from: process.env.GMAIL,
          to: email,
          subject: 'Reset Password Instruction',
          // text: `This is your email confirmation code: ${code}`,
          html: `
            <div>
              <p>Follow this link to reset your password:</p>
              <p>
                <a href="${link}">${link}</a>
              </p>
            </div>
          `
        }
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error)
          } else {
            console.log('Email sent: ' + info.response)
          }
        })

        return {
          hasError: false,
          message: `We have send a password reset link to ${email}.`
        }
      }
    },

    resetPassword: {
      type: ActionInfo,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        token: { type: new GraphQLNonNull(GraphQLString) },
        newPassword: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { id, token, newPassword }) => {
        const userToken = await TokenModel.findOne({ userId: id })
        if(!userToken || !(await bcrypt.compare(token, userToken.token))) {
          return {
            hasError: true,
            message: 'Invalid token.'
          }
        } else if(new Date > userToken.expiry) {
          return {
            hasError: true,
            message: 'Token has expired.'
          }
        }

        await UserModel.updateOne(
          { 
            _id: id 
          }, 
          {
            password: await bcrypt.hash(newPassword, 10)
          }
        )

        return {
          hasError: false,
          message: 'Password has been updated.'
        }
      }
    },

    registerWithEmail: {
      type: ActionOnUserPayload,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLEmail) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        verificationCode: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { name, email, password, verificationCode }, { session }) => {
        const verification = await VerificationModel.findOne({ id: email })
        if(verification?.code !== verificationCode) {
          return {
            actionInfo: {
              hasError: true,
              message: 'Verification code is not valid.'
            }
          }
        } else if(new Date() > verification.expiry) {
          return {
            actionInfo: {
              hasError: true,
              message: 'Verification code has expired.'
            }
          }
        }

        try {
          const user = await new UserModel({
            name,
            email,
            password: await bcrypt.hash(password, 10)
          }).save()

          session.user = {
            id: user._id.toString()
          }
          telegramChatIds.forEach(id => {
            telegramBot.sendMessage(id, `${name} just signed up!!!`)
          })
          return {
            actionInfo: {
              hasError: false,
              message: 'Register successful.'
            },
            user
          }
        } catch(e) {
          if(e.code === 11000) {
            return {
              actionInfo: {
                hasError: true,
                message: 'This email has already been registered.'
              }
            }
          }
        }
      }
    },

    loginWithEmail: {
      type: ActionOnUserPayload,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { email, password }, { session }) => {
        const user = await UserModel.findOne({ email })
        if(!user) {
          return {
            actionInfo: {
              hasError: true,
              message: 'Account not found.'
            }
          }
        } else if(!(await bcrypt.compare(password, user.password))) {
          return {
            actionInfo: {
              hasError: true,
              message: 'Invalid email - password combination.'
            }
          }
        }

        session.user = {
          id: user._id.toString()
        }
        telegramChatIds.forEach(id => {
          telegramBot.sendMessage(id, `${user.name} just signed in!!!`)
        })
        return {
          actionInfo: {
            hasError: false,
            message: 'Login successful.'
          },
          user
        }
      }
    },

    login: {
      type: ActionOnUserPayload,
      args: {
        loginId: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { loginId, password }, { session }) => {
        const data = await Promise.all([
          UserModel.findOne({ mobileNumber: loginId }),
          OtpCodeModel.findOne({ mobileNumber: loginId })
        ])
        const [user, otp] = data

        if(user) {
          if(otp?.code !== password) {
            return {
              actionInfo: {
                hasError: true,
                message: 'Invalid OTP code.'
              }
            }
          } else if(new Date() > otp.expiry) {
            return {
              actionInfo: {
                hasError: true,
                message: 'OTP code has expired.'
              }
            }
          } else {
            const store = await StoreModel.findOne({ merchantId: user._id })
            session.user = {
              id: user._id.toString(),
              isAdmin: user.isAdmin,
              storeId: store?._id.toString()
            }

            return {
              actionInfo: {
                hasError: false,
                message: 'Login successful.'
              }
            }
          }
        } else {
          return {
            actionInfo: {
              hasError: true,
              message: 'User not found.'
            }
          }
        }
      }
    },
    register: {
      type: ActionOnUserPayload,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        loginId: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { loginId, name, password }, { session }) => {
        const user = new UserModel({ name, mobileNumber: loginId })
        const otp = await OtpCodeModel.findOne({ mobileNumber: loginId })

        if(otp?.code !== password) {
          return {
            actionInfo: {
              hasError: true,
              message: 'Invalid OTP code.'
            }
          }
        } else if(new Date() > otp.expiry) {
          return {
            actionInfo: {
              hasError: true,
              message: 'OTP code has expired.'
            }
          }
        } else {
          let registeredUser = null
          try {
            registeredUser = await user.save()
          } catch(e) {
            if(e.code === 11000) {
              return {
                actionInfo: {
                  hasError: true,
                  message: 'This number has already been registered.'
                }
              }
            }
          }
          

          if(registeredUser) {
            session.user = {
              id: registeredUser._id.toString(),
              type: 1
            }
            telegramChatIds.forEach(id => {
              telegramBot.sendMessage(id, `${name} just signed up!!!`)
            })
            return {
              actionInfo: {
                hasError: false,
                message: 'Register successful.'
              }
            }
          }
        }
        
        
      }
    },
    logout: {
      type: ActionInfo,
      resolve: (_, __, { session }) => {
        delete session.user
        return {
          hasError: false
        }
      }
    },

    updateProfile: {
      type: ActionOnUserPayload,
      args: {
        otpCode: { type: GraphQLString },
        input: { type: new GraphQLNonNull(UpdateProfileInput) }
      },
      resolve: async (_, { input, otpCode }, { session: { user: loggedUser }, req: { files }}) => {
        if(loggedUser) {
          const data = await Promise.all([
            UserModel.findById(loggedUser.id),
            otpCode ? OtpCodeModel.findOne({ mobileNumber: input.mobileNumber }) : null
          ])

          const [user, otp] = data

          if(input.mobileNumber?.length > 0) {
            if(user.mobileNumber !== input.mobileNumber) {
              if(otp?.code !== otpCode) {
                return {
                  actionInfo: {
                    hasError: true,
                    message: 'Invalid OTP code.'
                  }
                }
              } else if(new Date() > otp.expiry) {
                return {
                  actionInfo: {
                    hasError: true,
                    message: 'OTP code has expired.'
                  }
                }
              }
            } 
          }

          const newProfilePicture = files.length > 0 ? await singleUpload(files[0]) : null
          const oldProfilePicture = user.profilePicture

          user.name = input.name
          if(input.mobileNumber?.length > 0)
            user.mobileNumber = input.mobileNumber

          if(newProfilePicture) {
            user.profilePicture = newProfilePicture
          }

          let savedUser = null
          try {
            savedUser = await user.save()
          } catch(e) {
            if(newProfilePicture) {
              uploader.destroy(newProfilePicture._id)
            }

            if(e.code === 11000) {
              return {
                actionInfo: {
                  hasError: true,
                  message: 'This number has already been registered.'
                }
              }
            }
          }
          
          if(savedUser && newProfilePicture && oldProfilePicture) {
            uploader.destroy(oldProfilePicture._id)
          }

          return {
            actionInfo: {
              hasError: false,
              message: 'Profile updated.'
            },
            user: savedUser
          }
        }
      }
    },

    createStore: {
      type: ActionOnStorePayload,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        whatsappNumber: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(AddressInput) }
      },
      resolve: async (_, args, { session: { user }}) => {
        if(user) {
          const store = await new StoreModel({
            merchantId: user.id,
            ...args
          }).save()

          return {
            actionInfo: {
              hasError: false,
              message: 'Store created.'
            },
            store
          }
        }
      }
    },

    updateStoreAddress: {
      type: ActionOnStorePayload,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(AddressInput) }
      },
      resolve: async (_, { id, address }, { session: { user }}) => {
        if(user) {
          const store = await StoreModel.findByIdAndUpdate(id, { address }, { new: true })
          return {
            actionInfo: {
              hasError: false,
              message: 'Store address has been updated.'
            },
            store
          }
        }
      }
    },

    updateStore: {
      type: ActionOnStorePayload,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        whatsappNumber: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(AddressInput) }
      },
      resolve: async (_, { id, name, whatsappNumber, address }, { session: { user }, req: { files }}) => {
        if(user) {
          let banner = null
          let profilePicture = null
          for(let i = 0; i < files.length; i++) {
            if(files[i].fieldname === 'banner')
              banner = files[i]
            else if(files[i].fieldname === 'profilePicture')
              profilePicture = files[i]
          }

          const data = await Promise.all([
            StoreModel.findById(id),
            banner ? singleUpload(banner) : null,
            profilePicture ? singleUpload(profilePicture) : null
          ])
          
          const [store, uploadedBanner, uploadedProfilePicture] = data
          const oldBanner = store.banner
          const oldProfilePicture = store.profilePicture

          store.name = name
          store.whatsappNumber = whatsappNumber
          store.address.fullAddress = address.fullAddress
          if(uploadedBanner)
            store.banner = uploadedBanner
          if(uploadedProfilePicture)
            store.profilePicture = uploadedProfilePicture
          
          let updatedStore = null

          if(
            store.address.provinceId !== address.provinceId ||
            store.address.cityId !== address.cityId ||
            store.address.districtId !== address.districtId
          ) {
            store.address.provinceId = address.provinceId
            store.address.cityId = address.cityId
            store.address.districtId = address.districtId
            
            const session = await StoreModel.startSession()
            session.startTransaction()
            try {
              const opts = { session }
              updatedStore = await store.save(opts)
              const productUpdateResult = await ProductModel.updateMany(
                { storeId: store._id },
                { administrativeAreaIds: [
                    address.provinceId, 
                    address.cityId, 
                    address.districtId
                  ] 
                },
                opts
              )
              console.log(productUpdateResult)
              await session.commitTransaction()
              session.endSession()
            } catch(e) {
              await session.abortTransaction()
              session.endSession()

              Promise.all([
                uploadedBanner ? uploader.destroy(uploadedBanner._id) : null,
                uploadedProfilePicture ? uploader.destroy(uploadedProfilePicture._id) : null
              ]).then(data => {
                console.log('Deleted Images data', data)
              })

              return {
                actionInfo: {
                  hasError: true,
                  message: 'Error updating store.'
                }
              }
            }
            
          } else {
            updatedStore = await store.save()
          }

          if(updatedStore) {
            Promise.all([
              uploadedBanner && oldBanner ? uploader.destroy(oldBanner._id) : null,
              uploadedProfilePicture && oldProfilePicture ? uploader.destroy(oldProfilePicture._id) : null
            ]).then(data => {
              console.log('Deleted Images data', data)
            })
          }

          return {
            actionInfo: {
              hasError: false,
              message: 'Store has been updated.'
            },
            store: updatedStore
          }
        }
      }
    },

    addSpecFieldToCategory: {
      type: GraphQLString,
      args: {
        categoryId: { type: new GraphQLNonNull(GraphQLString) },
        attributeId: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        isRequired: { type: GraphQLBoolean }
      },
      resolve: async (_, { categoryId, attributeId, isRequired, type }) => {
        const category = await CategoryModel.findById(categoryId)
        if(category) {
          if(!category.specFields.find(item => item.attributeId.equals(attributeId))) {
            category.specFields.push({
              attributeId,
              isRequired,
              type
            })

            await category.save()
          }
        }

        return true
      }
    },

    updateProduct: {
      type: ActionOnProductPayload,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        input: { type: new GraphQLNonNull(ProductInput) }
      },
      resolve: async (_, { id, input }, { session: { user }}) => {
        if(user) {
          const product = await ProductModel.findByIdAndUpdate(
            id, 
            {
              ...input,
              lastUpdatedBy: user.id
            },
            { 
              new: true
            }
          )

          return {
            actionInfo: {
              hasError: false,
              message: 'Product updated.'
            },
            product
          }
        }
      }
    },
    deleteProduct: {
      type: ActionOnProductPayload,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { id }, { session: { user }}) => {
        if(user) {
          const product = await ProductModel.findByIdAndUpdate(
            id, 
            {
              isDeleted: true,
              lastUpdatedBy: user.id
            },
            { 
              new: true
            }
          )

          return {
            actionInfo: {
              hasError: false,
              message: 'Product has been deleted.'
            },
            product
          }
        }
      }
    },
    updateProductFeaturedStatus: {
      type: ActionOnProductPayload,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        isFeatured: { type: new GraphQLNonNull(GraphQLBoolean) }
      },
      resolve: async (_, { id, isFeatured }, { session: { user }}) => {
        if(user?.isAdmin) {
          const product = await ProductModel.findByIdAndUpdate(
            id, 
            {
              isFeatured,
              lastUpdatedBy: user.id
            },
            { 
              new: true
            }
          )

          return {
            actionInfo: {
              hasError: false,
              message: 'Product has been updated.'
            },
            product
          }
        }
      }
    },
    suspendProduct: {
      type: ActionOnProductPayload,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        suspensionReasonId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { id, suspensionReasonId }, { session: { user }}) => {
        if(user?.isAdmin) {
          const product = await ProductModel.findByIdAndUpdate(
            id, 
            {
              isSuspended: true,
              suspensionReasonId,
              lastUpdatedBy: user.id
            },
            { 
              new: true
            }
          )

          return {
            actionInfo: {
              hasError: false,
              message: 'Product has been updated.'
            },
            product
          }
        }
      }
    },
    unsuspendProduct: {
      type: ActionOnProductPayload,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { id }, { session: { user }}) => {
        if(user?.isAdmin) {
          const product = await ProductModel.findByIdAndUpdate(
            id, 
            {
              isSuspended: false,
              suspensionReasonId: null,
              lastUpdatedBy: user.id
            },
            { 
              new: true
            }
          )

          return {
            actionInfo: {
              hasError: false,
              message: 'Product has been updated.'
            },
            product
          }
        }
      }
    },
    createProduct: {
      type: ActionOnProductPayload,
      args: {
        type: { type: new GraphQLNonNull(ProductTypeEnum) },
        storeId: { type: new GraphQLNonNull(GraphQLString) },
        categoryId: { type: new GraphQLNonNull(GraphQLString) },
        input: { type: new GraphQLNonNull(ProductInput) }
      },
      resolve: async (_, { type, categoryId, input, storeId }, { req: { files }, session: { user }}) => {
        if(user && files.length > 0) {
          let uploadedImageIds = []
          try {
            const data = await Promise.all([
              CategoryModel.findById(categoryId),
              StoreModel.findById(storeId),
              bulkUpload(files.slice(0, 7)) // limit only 7 files
            ])
            const [category, store, images] = data
            if(images?.length > 0) {
              uploadedImageIds = images.map(image => image._id)
            }

            if(category.listingType === 'rental_product' && !input.rentalDurationId) {
              Promise.all(uploadedImageIds.map(id => {
                uploader.destroy(id)
              })).then(data => {
                console.log('Deleted Images data', data)
              })
              throw new Error('rentalDurationId is required!')
            }

            if(category.requiresProductCondition && !input.productConditionId) {
              Promise.all(uploadedImageIds.map(id => {
                uploader.destroy(id)
              })).then(data => {
                console.log('Deleted Images data', data)
              })
              throw new Error('productConditionId is required!')
            }
  
            const { provinceId, cityId, districtId } = store.address
            const product = await new ProductModel({
              type,
              storeId,
              category: [...category.ancestorIds, categoryId],
              path: category.path,
              listingType: category.listingType,
              images,
              administrativeAreaIds: [provinceId, cityId, districtId],
              merchantId: user.id,
              lastUpdatedBy: user.id,
              ...input
            }).save()
  
            return {
              actionInfo: {
                hasError: false,
                message: 'Product created.'
              },
              product
            }
          } catch {
            Promise.all(uploadedImageIds.map(id => {
              uploader.destroy(id)
            })).then(data => {
              console.log('Deleted Images data', data)
            })

            return {
              actionInfo: {
                hasError: true,
                message: 'Error creating product.'
              },
              product
            }
          }
          
        }
      }
    },
    deleteProductImages: {
      type: ActionOnProductPayload,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        imageIds: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) }
      },
      resolve: async (_, { id, imageIds }, { session: { user }}) => {
        if(user) {
          const product = await ProductModel.findById(id)
          let hasError = false
          let message = 'Images deleted.'
          const deletedIds = []
          product.images = product.images.filter((image, i) => {
            if(imageIds.includes(image._id)) {
              if(i === 0) {
                hasError = true
                message = 'Can not delete main image.'
                return true
              } else {
                deletedIds.push(image._id)
                return false
              }
            }
            return true
          })

          if(deletedIds.length > 0) {
            product.lastUpdatedBy = user.id
          }

          const savedProduct = await product.save()
          if(savedProduct) {
            Promise.all(deletedIds.map(id => {
              uploader.destroy(id)
            })).then(data => {
              console.log('Deleted Images data', data)
            })
          }

          return {
            actionInfo: {
              hasError,
              message
            },
            product: savedProduct
          }
        }
      }
    },
    addProductImages: {
      type: ActionOnProductPayload,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { id }, { session: { user }, req: { files }}) => {
        if(user && files) {
          const data = await Promise.all([
            ProductModel.findById(id),
            bulkUpload(files)
          ])

          const [product, images] = data
          let idsToDelete = []
          
          for(let i = 0; i < images.length; i++) {
            if(product.images.length < 7) {
              product.images.push(images[i])
              product.lastUpdatedBy = user.id
            } else {
              idsToDelete.push(images[i]._id)
            }
          }

          try {
            Promise.all(idsToDelete.map(id => {
              uploader.destroy(id)
            })).then(data => {
              console.log('Deleted Images data', data)
            })

            return {
              actionInfo: {
                hasError: false,
                message: 'Images uploaded.'
              },
              product: await product.save()
            }
          } catch(e) {
            if(images?.length > 0) {
              Promise.all(images.map(image => {
                uploader.destroy(image._id)
              })).then(data => {
                console.log('Deleted Images data', data)
              })
            }

            return {
              actionInfo: {
                hasError: true,
                message: 'Error uploading images.'
              }
            }
          }
          
        }
      }
    },
    updateMainProductImage: {
      type: ActionOnProductPayload,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        imageId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { id, imageId }, { session: { user }}) => {
        if(user) {
          const product = await ProductModel.findById(id)
          const prevMainImage = product.images[0]
          const images = product.images.slice(0)
          for(let i = 0; i < product.images.length; i++) {
            const image = product.images[i]
            if(image._id == imageId) {
              images[0] = image
              images[i] = prevMainImage
              break
            }
          }
          product.images = images
          product.lastUpdatedBy = user.id

          return {
            actionInfo: {
              hasError: false,
              message: 'Main product image updated.'
            },
            product: await product.save()
          }
        }
      }
    },
    updateProfilePicture: {
      type: ActionOnUserPayload,
      resolve: async (_, __, { session: { user }, req: { files }}) => {
        if(user && files.length > 0) {
          const data = await Promise.all([
            UserModel.findById(user.id),
            singleUpload(files[0])
          ])

          const [loggedUser, image] = data
          const prevProfilePictureId = loggedUser.profilePicture?._id

          loggedUser.profilePicture = image

          const savedUser = await loggedUser.save()
          if(savedUser && prevProfilePictureId) {
            uploader.destroy(prevProfilePictureId)
          }

          return {
            actionInfo: {
              hasError: false,
              message: 'Profile picture updated.'
            },
            user: savedUser
          }
        }
      }
    },
    updateStoreProfilePicture: {
      type: ActionOnStorePayload,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { id }, { session: { user }, req: { files }}) => {
        if(user && files.length > 0) {
          const data = await Promise.all([
            StoreModel.findById(id),
            singleUpload(files[0])
          ])

          const [store, image] = data
          const prevProfilePictureId = store.profilePicture?._id

          store.profilePicture = image

          const savedStore = await store.save()
          if(savedStore && prevProfilePictureId) {
            uploader.destroy(prevProfilePictureId)
          }

          return {
            actionInfo: {
              hasError: false,
              message: 'Profile picture updated.'
            },
            store: savedStore
          }
        }
      }
    },

    updateStoreBanner: {
      type: ActionOnStorePayload,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { id }, { session: { user }, req: { files }}) => {
        if(user && files.length > 0) {
          const data = await Promise.all([
            StoreModel.findById(id),
            singleUpload(files[0])
          ])

          const [store, image] = data
          const prevBannerId = store.banner?._id

          store.banner = image

          const savedStore = await store.save()
          if(savedStore && prevBannerId) {
            uploader.destroy(prevBannerId)
          }

          return {
            actionInfo: {
              hasError: false,
              message: 'Profile picture updated.'
            },
            store: savedStore
          }
        }
      }
    },

    updateSpecField: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        max: { type: GraphQLInt },
        min: { type: GraphQLInt },
        options: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
        isEnum: { type: GraphQLBoolean },
        isAutocomplete: { type: GraphQLBoolean }
      },
      resolve: async (_, { id, type, max, min, options, isEnum, isAutocomplete }) => {
        // const res = await CategoryModel.updateOne({
        //   'specFields._id': id
        // }, {
        //   'specFields.$.max': max,
        //   'specFields.$.min': min,
        //   'specFields.$.type': type,
        //   'specFields.$.options': options,
        //   'specFields.$.isEnum': isEnum,
        //   'specFields.$.isAutocomplete': isAutocomplete
        // })
        // console.log(res)
        // return true
        const cat = await CategoryModel.findOne({ 'specFields._id': id })
        const specFields = cat.specFields.map(field => {
          if(field._id.toString() === id) {
            return {
              // ...field,
              _id: field._id,
              attributeId: field.attributeId,
              isRequired: field.isRequired,
              max,
              min,
              type,
              options,
              isEnum,
              isAutocomplete
            }
          } else {
            return field
          }
        })

        cat.specFields = specFields
        const res = await cat.save()
        console.log(res)
        return 'updated'
      }
    },
    updateProductCat: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        path: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { id, path }) => {
       
        await ProductModel.updateOne({
          _id: id
        }, { category: path.split('/'), path })
        return 'updated'
      }
    },
    createCategory: {
      type: GraphQLString,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        listingType: { type: GraphQLString },
        requiresProductCondition: { type: new GraphQLNonNull(GraphQLBoolean) },
        showsProductConditionField: { type: new GraphQLNonNull(GraphQLBoolean) },
        iconUrl: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, args) => {
        const _id = mongoose.Types.ObjectId()
        const icons = [
          {
            _id: uuidv4(),
            url: args.iconUrl,
            width: 500,
            height: 500,
            bytes: 0,
            format: 'jpg',
            display: 0
          }
        ]
        const cat = new CategoryModel({
          _id,
          icons,
          path: _id.toString(),
          name: args.name,
          listingType: args.listingType,
          requiresProductCondition: args.requiresProductCondition,
          showsProductConditionField: args.showsProductConditionField
        })
        await cat.save()
        return 'created'
      }
    },
    createSubcategory: {
      type: GraphQLString,
      args: {
        parentId: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        iconUrl: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { parentId, name, iconUrl }) => {
        const parentCat = await CategoryModel.findById(parentId)
        const subcat = new CategoryModel({ name, parentId })
        subcat.path = `${parentCat.path}/${subcat._id.toString()}`
        subcat.level = subcat.path.split('/').length
        subcat.ancestorIds = [...parentCat.ancestorIds, parentId]
        subcat.listingType = parentCat.listingType
        subcat.specFields = parentCat.specFields.map(field => {
          return {
            _id: mongoose.Types.ObjectId(),
            attributeId: field.attributeId,
            isRequired: field.isRequired,
            max,
            min,
            type,
            options,
            isEnum,
            isAutocomplete
          }
        })
        subcat.icons = [
          {
            _id: uuidv4(),
            url: iconUrl,
            width: 500,
            height: 500,
            bytes: 0,
            format: 'jpg',
            display: 0
          }
        ]
        await subcat.save()
        return subcat._id
      }
    },
    createPost: {
      type: GraphQLString,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args, { session: { user }}) => {
        if(user) {
          const post = new PostModel({ ...args, lastUpdatedBy: user.id })
          await post.save()
          return 'created'
        }
      }
    },
    updateCategory: {
      type: ActionOnCategoryPayload,
      args: {
        input: { type: new GraphQLNonNull(UpdateCategoryInput) }
      },
      resolve: async (_, { input }, { session: { user }, req: { files }}) => {
        if(user?.isAdmin) {
          const data = await Promise.all([
            CategoryModel.findById(input.id),
            files.length > 0 ? singleUpload(files[0]) : null
          ])
          const [cat, uploadedImage] = data
          cat.name = input.name
          cat.showsProductConditionField = input.showsProductConditionField
          cat.requiresProductCondition = !input.showsProductConditionField ? false : input.requiresProductCondition
          cat.isPublished = input.isPublished
          cat.specFields = input.specFields
          cat.lastUpdatedBy = user.id

          if(uploadedImage) {
            const prevIcon = cat.icons && cat.icons[0]
            cat.icons = [uploadedImage]
            if(prevIcon) {
              uploader.destroy(prevIcon._id)
            }
          }

          const saved = await cat.save()
          return {
            actionInfo: {
              hasError: false,
              message: 'Category updated.'
            },
            category: saved
          }
        }
      }
    }
  }
})