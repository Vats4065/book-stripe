const User = require("../models/registerSchema");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bookModel = require("../models/bookSchema");
const { default: mongoose } = require("mongoose");
const cartModel = require("../models/cartSchema");
const orderModel = require('../models/orderSchema');

const register = async (req, res) => {
  try {
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log("register");

    const data = {
      name: req.body.name,
      email: req.body.email,
      contact: req.body.number,
      password: hashedPassword,
      role: req.body.role,
    };


    console.log(data);

    const created = new User(data);
    await created.save();
    return res.status(200).json({
      msg: "User Registered",
      created,
    });


  } catch (error) {
    return res.status(400).json({
      msg: "Error Registered",
      error,
    });
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);

    const find = await User.findOne({ email });
    console.log("find._id", find);
    if (find) {
      bcrypt.compare(password, find.password, (err, resp) => {
        if (err) {
          return res.status(401).json({
            msg: "Failed Login",
            err,
          });
        }
        if (resp) {
          const token = jwt.sign(
            { userData: find.id },
            "secret-key",
            { expiresIn: "24h" }
          );
          console.log("inlogin token", token);
          return res.status(200).json({
            msg: "User Login",
            token,
            find,
          });
        } else {
          return res.status(404).json({
            msg: "Password Not Match",
          });
        }
      });
    } else {
      return res.status(404).json({
        msg: "Invalid data",
      });
    }
  } catch (error) {
    return res.status(400).json({
      msg: "Error Login",
      error,
    });
  }
};

const book = async (req, res) => {
  try {
    const { name, description, title, author, price } = req.body;
    const quantity = Number(req.body.quantity);
    const bookData = {
      name,
      description,
      title,
      image: req.file?.filename,
      author,
      price,
      quantity: quantity.toString(),
    };
    console.log(bookData);
    const createbook = new bookModel(bookData);
    await createbook.save();
    res.status(200).json({
      msg: "Book Created",
      createbook,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Error Created Book",
      error,
    });
  }
};



const getAllBook = async (req, res) => {
  try {
    const find = await bookModel.find().populate("author");
    console.log("Find Book");
    return res.status(200).json({
      msg: "User find",
      find
    });
  } catch (err) {
    return res.status(404).json({
      msg: "User Error",
      err,
    });
  }
}

const getAuthorData = async (req, res) => {
  const id = req.user;
  try {
    console.log(id);
    const getOne = await bookModel.find({ author: id }).populate("author");
    const authorData = getOne[0].author;
    const find = await bookModel.aggregate([
      { $match: { author: new mongoose.Types.ObjectId(id) } },
    ]);
    console.log("Find Author");
    return res.status(200).json({
      msg: "User find",
      authorData,
      data: { find },
    });
  } catch (err) {
    return res.status(404).json({
      msg: "User Error",
      err,
    });
  }
};


const addToCart = async (req, res) => {
  // try {
  //   // console.log(req.params);
  //   // const bookId = req.params.id;
  //   // console.log("bookId", bookId);
  //   // const getBook = await bookModel.findById(bookId);
  //   // console.log("getBook", getBook);
  //   // const userId = req.user;
  //   // console.log("userId", userId);

  //   // const quantity = 1;
  //   // console.log("quantity", quantity);
  //   // const price = Number.parseInt(getBook.price);
  //   // console.log("price", typeof price);
  //   // const total = quantity * price;
  //   // console.log("total", typeof total);

  //   const obj = {
  //     userId: userId,
  //     bookId: bookId,
  //     price: price,
  //     quantity: quantity.toString(),
  //     totalPrice: total.toString(),
  //   };
  //   console.log("obj", typeof obj.quantity);
  //   console.log("obj", typeof obj.totalPrice);

  //   let cart = await cartModel.findOne({ userId: userId });

  //   if (!cart) {
  //     cart = new cartModel({
  //       userId: userId,
  //       items: [],
  //       totalPrice: 0,
  //     });
  //   }

  //   const findItemIndex = cart.items.findIndex((item) =>
  //     item.bookId.equals(bookId)
  //   );
  //   console.log("findItemIndex", findItemIndex);

  //   // if (findItemIndex !== -1) { 
  //   //   cart.items[findItemIndex].quantity += quantity; 
  //   //   cart.totalPrice += total; 
  //   // } 
  //   if (findItemIndex >= 0) {
  //     return res.status(404).json({ msg: "You Are Not Created Cart" });
  //   }
  //   else {
  //     cart.items.push({
  //       bookId: bookId,
  //       price: price,
  //       quantity: quantity,
  //     });
  //     cart.totalPrice += total;
  //   }

  //   // cart.totalPrice += total;

  //   console.log("cart", cart);

  //   const savedCart = await cart.save();
  //   console.log("savedCart", savedCart);

  //   res.status(200).json({
  //     msg: "Add To Cart",
  //     cart: savedCart,
  //   });
  // } catch (error) {
  //   res.status(400).json({
  //     msg: "Error",
  //     error,
  //   });
  // }

  try {
    const userId = req.body.author._id;
    const bookId = req.body._id;
    const quantity = 1;
    const price = Number.parseInt(req.body.price);
    const obj = {
      userId,
      items: [{
        bookId,
        price: req.body.price,
        quantity,
      }], totalPrice: quantity * price


    }


    let cart = await cartModel.findOne({ userId });
    if (cart === null) {
      let newCart = await cartModel.create(obj)
      return res.json({ msg: "create new cart", newCart }).status
    }
    // else {
    //   let index = cart.items.findIndex((item) => item.bookId === bookId)
    //   if (index > -1) {
    //     cart.items[index].quantity += 1
    //     cart.totalPrice += price
    //   }

    // }
    console.log(userId);



    console.log(obj);
    return res.status(200).json({ msg: "addtocart" })
  } catch (error) {
    return res.status(400).json({ msg: error })
  }
};




const getCart = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await cartModel.findById(id).populate("items.bookId");
    res.status(200).json({
      msg: "User find", data
    });
  }
  catch (err) {
    res.status(400).json({
      msg: "User Error",
    });
  }
}

const updateCart = async (req, res) => {
  try {
    const bookId = req.params.id;
    console.log("bookId", bookId);
    const getUserBook = await bookModel.findById(bookId);
    console.log("getUserBook", getUserBook);
    const findQuantity = getUserBook.quantity;
    console.log("findQuantity", findQuantity);
    console.log();
    const userId = req.user;
    const quantity = Number(req.body.quantity);


    let cart = await cartModel.findOne({ userId: userId });
    console.log("cartforupdate", cart);

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }
    if (quantity > findQuantity) {
      return res.status(404).json({ msg: `Please Enter Quantity less then ${findQuantity}` });
    }

    const bookItemIndex = cart.items.findIndex(item => item.bookId == bookId);
    console.log("bookItemIndex", bookItemIndex);
    if (bookItemIndex === -1) {
      return res.status(404).json({ msg: "Item not found in cart" });
    }

    cart.items[bookItemIndex].quantity = quantity.toString();
    console.log("cart.items", cart.items);

    const totalItemsPrice = await Promise.all(cart.items.map(async (item) => {
      const book = await bookModel.findById(item.bookId);
      console.log("book", book);

      const bookPrice = book.price;
      const itemQuantity = Number(item.quantity);
      return bookPrice * itemQuantity;
    })).then(prices => prices.reduce((total, price) => total + price, 0));

    cart.totalPrice = totalItemsPrice;

    await cartModel.findByIdAndUpdate(cart._id, { items: cart.items, totalPrice: cart.totalPrice });

    res.status(200).json({
      msg: "Cart updated",
      cart
    });
  } catch (error) {
    res.status(400).json({
      msg: "Error",
      error
    });
  }
};


const deleteCart = async (req, res) => {
  try {
    const bookId = req.params.id;
    console.log("bookId", bookId);
    const userId = req.user;
    console.log("userId", userId);
    const getBook = await bookModel.findById(bookId);
    console.log("getBook", getBook);

    if (!getBook) {
      return res.status(404).json({ msg: "Book not found" });
    }
    let cart = await cartModel.findOne({ userId: userId });
    console.log("deletecart", cart);

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }
    console.log("before delete", cart.items);

    cart.items = cart.items.filter(item => !item.bookId.equals(bookId));

    console.log("after delete", cart.items);

    const totalItemsPrice = await Promise.all(cart.items.map(async (item) => {
      const book = await bookModel.findById(item.bookId);
      const bookPrice = book.price;
      console.log("bookPrice", bookPrice);
      const itemQuantity = Number(item.quantity);
      console.log("itemQuantity", itemQuantity);
      return bookPrice * itemQuantity;
    })).then(prices => prices.reduce((total, price) => total + price, 0));

    cart.totalPrice = totalItemsPrice;

    await cartModel.findOneAndUpdate({ userId: userId }, { items: cart.items, totalPrice: cart.totalPrice });

    res.status(200).json({
      msg: "Item deleted from cart",
      cart
    });
  }
  catch (error) {
    res.status(400).json({
      msg: "Error",
      error
    });
  }
};

const getOrder = async (req, res) => {
  try {
    const userId = req.user;
    console.log("userId", userId);
    const cart = await cartModel.findOne({ userId: userId });
    console.log("cart", cart);
    const bookId = req.params.id;
    console.log("bookId", bookId);
    const getAuthorBook = await bookModel.findById(bookId);
    console.log("getAuthorBook", getAuthorBook);

    const findItemIndex = cart.items.findIndex((item) =>
      item.bookId.equals(bookId)
    );
    console.log("findItemIndex", findItemIndex);

    const quantity = cart.items[findItemIndex].quantity;
    console.log("quantity", quantity);

    const price = cart.items[findItemIndex].price;
    console.log("price", price);

    const authorId = getAuthorBook.author
    console.log("authorId", authorId);

    const order = {
      userId: userId,
      bookId: bookId,
      quantity: quantity,
      price: price,
      author: authorId
    }
    const sendOrder = new orderModel(order);
    await sendOrder.save();
    res.status(200).json({
      msg: "Order Send Successfully",
      sendOrder
    });
  }
  catch (err) {
    res.status(400).json({
      msg: "User Error",
    });
  }
}

const getUser = async (req, res) => {
  try {
    console.log("verify");
    res.status(200).json({
      msg: "token verifying",
    });
  } catch (error) {
    res.status(400).json({
      msg: "Error",
      error,
    });
  }
};

const findData = async (req, res) => {
  try {

    const find = await User.findById(req.user);
    console.log("Find Data", find);
    res.status(200).json({
      msg: "Find Data",
      find,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Error Get Data",
      error,
    });
  }
};



module.exports = {
  register,
  login,
  getUser,
  findData,
  book,
  getAuthorData,
  addToCart,
  getCart,
  updateCart,
  deleteCart,
  getOrder,
  getAllBook
};
