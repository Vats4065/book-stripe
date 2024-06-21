const express = require('express');
const router = express.Router();
const { register, login, getUser, findData, book, getAuthorData, addToCart, getCart, updateCart, deleteCart, getOrder, getAllBook } = require('../controllers/regLogApi');
const { auth, checkLogin, uploadFile } = require('../middleware/auth');
const {createCustomer, getCard} = require('../controllers/createcustomer');

router.post('/registerUser', register);
router.post('/loginUser', login);
router.post('/user', auth, getUser);
router.get('/findData', auth, findData);
router.post('/createBook', uploadFile.single('image'), book);
router.get('/getAuthorData', auth, getAuthorData)
// router.post('/addCart/:id', auth, addToCart)
router.get('/getcart/:id', getCart)
// router.post('/updatecart/:id', auth, updateCart);
router.post('/addCart/:id', addToCart)
router.delete('/deleteCart/:id', auth, deleteCart);
router.post('/getUserOrder/:id', auth, getOrder);
router.get("/getAllBook", getAllBook)
router.post("/create-customer", createCustomer)
router.get("/getCard",getCard)




module.exports = router; 