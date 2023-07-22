import { useState, useEffect } from "react";
import {
  createProduct,
  getProductsByCountry,
  updateProduct,
  deleteProduct,
} from "../services/products.js";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import { getCountry } from "../services/countryinfo.js";

Modal.setAppElement("#root");

export default function CountryP(props) {
  const { user } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const [newLogo, setNewLogo] = useState("");
  const [allproducts, setAllproducts] = useState({});
  const [products, setProducts] = useState([]);
  const [country, setCountry] = useState({});
  const [productUpdate, setProductUpdate] = useState("");
  const { product, showButtons } = props;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { name, id } = useParams();
  const [productdata, setProductdata] = useState({
    Name: "",
    Price: 0,
    logo: "",
    Details: "",
    Country: "",
  });
 
  const fetchCountry = async () => {
    try {
      const oneCountry = await getCountry(name);
      console.log(oneCountry);
      setCountry(oneCountry);
    } catch (error) {
      console.error(`Failed to fetch country - error: ${error}`);
    }
  };

  useEffect(() => {
    console.log("its rendering");
    fetchCountry();
    fetchProductsByCountry();
  }, [name]);

  const fetchProductsByCountry = async () => {
    try {
      const productsByCountry = await getProductsByCountry(name);
      console.log(productsByCountry);
      setProducts(productsByCountry);
    } catch (error) {
      console.error(`Failed to fetch products - error: ${error}`);
    }
  };

  useEffect(() => {
    fetchProdcuts();
  }, []);

  const fetchProdcuts = async () => {
    try {
      const alldaproducts = await getProductsByCountry(name);
      // console.log(alldaproducts);
      setNewLogo(productdata.logo);
      setAllproducts(alldaproducts);
    } catch (error) {
      console.error(`Failed to fetch products - error: ${error}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductdata((prevData) => ({
      ...prevData,
      [name]: value,
      Country: country._id,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProduct(productdata);
    setProductdata({ ...productdata, logo: "" }); // Clear the logo input field
    setNewLogo(productdata.logo);
    closeModal();
  };
  const openModal = () => {
    setModalIsOpen(true);
    navigate(`/${country.name && country.name.common}`);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProduct(null);
    setProductdata({
      Name: "",
      Price: 0,
      logo: "",
      Details: "",
      Country: "",
    });
   
  };
  
  
  const handleEditProduct = (product) => {
    setSelectedProduct({
      ...product,
      product: productdata._id,
    });
    setModalIsOpen(true);
    // navigate(`/products/products/${product._id}`);
  };
  // const handleUpdateChange = (e) => {
  //   const { name, value } = e.target;
  //   setProductdata((prevData) => ({
  //     ...prevData,
  //     [name]: value ,
  //     product: productdata._id
  //   }));
  // };
  
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  
 

  const handleUpdate = async (e) => {
    e.preventDefault();
    // await updateProduct(name, productdata._id);
    // navigate(`/products/${id}`, {replace: true})
    await updateProduct(id , productdata) //productUpdate);
    setToggle((prev) => !prev);
    navigate(`/${country.name && country.name.common}`)
    // navigate(`/products/${name}`, {replace: true})
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteProduct(productdata._id);
    // navigate(`/products/${id}`, {replace: true})
    setToggle((prev) => !prev);
  };

  return (
    <div className="Products">
      <h1>Add a niche product here</h1>

      <div className="addproducts">
        <button className="addproduct" onClick={openModal}>
          Add Product
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Add Product Modal"
        >
          <form className="formproducts" onSubmit={handleSubmit}>
            <p>
              Please provide the necessary details in the input fields below to
              edit your product.
            </p>
            <input type="hidden" name="Country" value={country._id} />
            <label>
              <div>Name:</div>
              <input
                type="text"
                name="Name"
                value={productdata.Name}
                onChange={handleChange}
              />
            </label>
            <label>
              <div>Price:</div>
              <input
                type="Number"
                name="Price"
                value={productdata.Price}
                onChange={handleChange}
              />
            </label>
            <label>
              <div>logo:</div>
              <input
                type="text"
                name="logo"
                value={productdata.logo}
                onChange={handleChange}
              />
            </label>

            <label>
              <div>Details:</div>
              <textarea
                type="text"
                name="Details"
                value={productdata.Details}
                onChange={handleChange}
              />
            </label>

            <button className="addproduct" type="submit">
              Submit
            </button>
          </form>
          {newLogo && (
            <div className="newProduct">
              <img
                className="grid-container"
                src={newLogo}
                alt="New Product Logo"
              />
              <div className="textCharAdded">Product Added!</div>
            </div>
          )}
        </Modal>
        
        {products.map((product) => (
  <div key={product._id}>
    <h3>{product.Name}</h3>
    <p>Price: ${product.Price}</p>
    <p>Details: {product.Details}</p>
    <button className="editproduct" onClick={() => handleEditProduct(product)}>
      Edit
    </button>
    <button className="deleteprod" onClick={() => handleDelete(productdata._id)}>
    Delete
    </button>
  </div>
  
        ))}
<Modal
  isOpen={selectedProduct  !== null}
  onRequestClose={closeModal}
  contentLabel="Edit Product Modal"
  clickableOverlay={true}
   
 
  
>
  {selectedProduct &&  (
    
    <form className="formproducts" onSubmit={handleUpdate}>
      
       <input
        type="hidden"
        name="Country"
        value={selectedProduct.Country}
        onChange={handleUpdateChange}
      />
      <label>
              <div>Name:</div>
      <input
      
        type="text"
        name="Name"
        value={selectedProduct.Name}
        onChange={handleUpdateChange}
        // onChange={(e) => setSelectedProduct({ ...selectedProduct, Name: e.target.value })}
      />
      </label>
      <label>
              <div>Price:</div>
      <input
        type="number"
        name="Price"
        value={selectedProduct.Price}
        onChange={handleUpdateChange}
//         onChange={(e) => {setSelectedProduct({ ...selectedProduct, Price: e.target.value });
// }}
      />
      </label>
      <label>
              <div>logo:</div>
      <input
        type="text"
        name="logo"
        value={selectedProduct.logo}
        onChange={handleUpdateChange}
        // onChange={(e) => setSelectedProduct({ ...selectedProduct, logo: e.target.value })}
      />
      </label>
      <label>
              <div>Details:</div>
      <textarea
        name="Details"
        value={selectedProduct.Details}
        onChange={handleUpdateChange}
        // onChange={(e) => setSelectedProduct({ ...selectedProduct, Details: e.target.value })}
      ></textarea>
      </label>
      <button type="submit">Edit</button>
    </form>
  )}
</Modal>
      </div>
    </div>
  );
}
