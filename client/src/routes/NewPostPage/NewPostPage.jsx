import { useState } from "react";
import "./newpostpage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PostServices from "../../services/PostServices";
import parse from "html-react-parser";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [showImages, setShowImages] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  function uploader(e) {
    const imageFile = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      setShowImages((pv) => [...pv, e.target.result]);
    });

    reader.readAsDataURL(imageFile);
  }
  const handleImages = (e) => {
    setUploadImages((pv) => [...pv, e.target.files[0]]);
    uploader(e);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (value.trim() !== "") {
      var { props } = parse(value);
      console.log(props);
    }
    const inputs = Object.fromEntries(formData);

    try {
      formData.append("postData[title]", inputs.title);
      formData.append("postData[price]", parseInt(inputs.price));
      formData.append("postData[address]", inputs.address);
      formData.append("postData[city]", inputs.city);
      formData.append("postData[bedroom]", parseInt(inputs.bedroom));
      formData.append("postData[bathroom]", parseInt(inputs.bathroom));
      formData.append("postData[type]", inputs.type);
      formData.append("postData[property]", inputs.property);
      formData.append("postData[latitude]", inputs.latitude);
      formData.append("postData[longitude]", inputs.longitude);

      // Append multiple images
      uploadImages.forEach((image, index) => {
        formData.append(`postData[images]`, image);
      });

      // Append postDetail data
      formData.append("postDetail[desc]", props?.children || "");
      formData.append("postDetail[utilities]", inputs.utilities);
      formData.append("postDetail[pet]", inputs.pet);
      formData.append("postDetail[income]", inputs.income);
      formData.append("postDetail[size]", parseInt(inputs.size));
      formData.append("postDetail[school]", parseInt(inputs.school));
      formData.append("postDetail[bus]", parseInt(inputs.bus));
      formData.append("postDetail[restaurant]", parseInt(inputs.restaurant));

      const res = await PostServices.createPost(formData);
      // navigate("/" + res.data.id);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" value={value} onChange={setValue} />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="Rent" defaultChecked>
                  Rent
                </option>
                <option value="Buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property">
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Condo">Condo</option>
                <option value="Land">Land</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">bus</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>
            <button className="sendButton">Add</button>
          </form>
        </div>
      </div>
      <div className="leftContainer">
        <div className="wrapper">
          <div className="update-img">
            {showImages.map((image) => (
              <img src={image} />
            ))}
          </div>
          <label htmlFor="file-upload" className="custom-file-upload">
            Upload Image
          </label>
          <input id="file-upload" type="file" onChange={handleImages} />
        </div>
      </div>
    </div>
  );
}

export default NewPostPage;
