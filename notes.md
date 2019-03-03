# Notes
- Created and managed the web app using MVC (Model, View, Controller) architecture. In this web app integrating with Express:
  - Models are part where we save information needed and define their behaviors in databse. (Database)
  - Views are pages that users to interact with. (Browser)
  - Controllers are part where they can bring and take information between models and views. (Server)

- We won't store data on local machine, use DataBase-as-a-Service (DBaas) called 'mLab' instead:
  - It provides us with simplicities to setup database
  - It provides us with the Graphic Interface to look around the database

- Used mongodb, and integrated mongoose, an ODM (Object Database Manager) for making life easier to write tedious, error-prone and repetitive database code.

- Use the snippet of code as follow to tell when at this path use the specified middleware:
```javascript
const commentRouter = require('./comment');
router.use('/:postId/comments', commentRouter);
```
- If need login status of the user, we can define a function to help us to authenticate the user status. And put this function at the second parameter of the router action.
```javascript
exports.requireLogin = (req, res, next) => {
  // authenticate login status
}
router.get('/newPost', requireLogin, (req, res, next) => {
  // code as follow...
});
```

- When storing the user's information, the password specially, needed to be hashed before saving the text password into database. We use 'bcrypt' to help with this authentication.

- When need to update changes use code snippet as follow (populate the property)
```javascript
// need to add a reference to another document
const PostSchema = new mongoose.Schema({
  room: {type: mongoose.Schema.Types.ObjectId, ref: 'Room'},
  comments: [{type: mongoose.Schema.Types.ObjectId, ref:'Comment'}]
});

Post = mongoose.model('Post', PostSchema);
Post.find({room: room}).populate('comments').exec(function(err, posts) {
  // code as follow...
});
```

- When add event to objects in a loop, only the last one is working because after reaching the maximum index, only the last object is added with this event. Use forEach or pass the object to another function to add the event.
