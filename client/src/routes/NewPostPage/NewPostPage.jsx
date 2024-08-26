import { useContext, useEffect, useState } from "react";
import "./newpostpage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PostServices from "../../services/PostServices";
import parse from "html-react-parser";
import { useNavigate, useParams } from "react-router-dom";
import { PostContext } from "../../components/Context/PostContext";

function NewPostPage() {
  const [updatePost, setUpadatePost] = useState(null);
  const [value, setValue] = useState("");
  const [showImages, setShowImages] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  const { postId } = useParams();
  const navigate = useNavigate();
  function uploader(e) {
    const imageFile = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      setShowImages((pv) => [...pv, e.target.result]);
    });

    reader.readAsDataURL(imageFile);
  }
  useEffect(() => {
    if (postId) {
      (async () => {
        try {
          const postResponse = await PostServices.getSinglePost(postId);
          if (!postResponse) {
            navigate("/profile");
            return;
          }
          setUploadImages(postResponse.images)
          setShowImages(postResponse.images);
          setValue(postResponse.desc);
          setUpadatePost(postResponse);
        } catch (error) {
          console.error("Failed to fetch post data:", error);
          navigate("/profile");
        }
      })();
    }
  }, [postId]);
  const handleImages = (e) => {
    setUploadImages((pv) => [...pv, e.target.files[0]]);
    uploader(e);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (value.trim() !== "") {
      var { props } = parse(value);
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
      uploadImages.forEach((image) => {
        formData.append(`postData[images]`, image);
      });
      formData.append("postDetail[desc]", props?.children || "");
      formData.append("postDetail[utilities]", inputs.utilities);
      formData.append("postDetail[pet]", inputs.pet);
      formData.append("postDetail[income]", inputs.income);
      formData.append("postDetail[size]", parseInt(inputs.size));
      formData.append("postDetail[school]", parseInt(inputs.school));
      formData.append("postDetail[bus]", parseInt(inputs.bus));
      formData.append("postDetail[restaurant]", parseInt(inputs.restaurant));

      if (updatePost) {
        await PostServices.updatePost(postId, formData);
        navigate("/profile");
      } else {
        const id = await PostServices.createPost(formData);
        navigate("/list/" + id);
      }
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
              <input
                defaultValue={updatePost && updatePost.title}
                id="title"
                name="title"
                type="text"
              />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input
                defaultValue={updatePost && updatePost.price}
                id="price"
                name="price"
                type="number"
              />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input
                defaultValue={updatePost && updatePost.address}
                id="address"
                name="address"
                type="text"
              />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill
                theme="snow"
                defaultValue={updatePost && updatePost.desc}
                value={value}
                onChange={setValue}
              />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input
                defaultValue={updatePost && updatePost.city}
                id="city"
                name="city"
                type="text"
              />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input
                defaultValue={updatePost && updatePost.bedroom}
                min={1}
                id="bedroom"
                name="bedroom"
                type="number"
              />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input
                defaultValue={updatePost && updatePost.bathroom}
                min={1}
                id="bathroom"
                name="bathroom"
                type="number"
              />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input
                defaultValue={updatePost && updatePost.latitude}
                id="latitude"
                name="latitude"
                type="text"
              />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input
                defaultValue={updatePost && updatePost.longitude}
                id="longitude"
                name="longitude"
                type="text"
              />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type" defaultValue={updatePost && updatePost.type}>
                <option value="Rent" defaultChecked>
                  Rent
                </option>
                <option value="Buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select
                name="property"
                defaultValue={updatePost && updatePost.property}
              >
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Condo">Condo</option>
                <option value="Land">Land</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select
                name="utilities"
                defaultValue={updatePost && updatePost.utilities}
              >
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet" defaultValue={updatePost && updatePost.pet}>
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
                defaultValue={updatePost && updatePost.income}
                placeholder="Income Policy"
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input
                defaultValue={updatePost && updatePost.size}
                min={0}
                id="size"
                name="size"
                type="number"
              />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input
                defaultValue={updatePost && updatePost.school}
                min={0}
                id="school"
                name="school"
                type="number"
              />
            </div>
            <div className="item">
              <label htmlFor="bus">bus</label>
              <input
                defaultValue={updatePost && updatePost.bus}
                min={0}
                id="bus"
                name="bus"
                type="number"
              />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input
                defaultValue={updatePost && updatePost.restaurant}
                min={0}
                id="restaurant"
                name="restaurant"
                type="number"
              />
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
