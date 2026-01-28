import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Correct import
import {
  FiPackage,
  FiDollarSign,
  FiLayers,
  FiImage,
  FiGrid,
  FiChevronRight,
  FiUpload,
  FiCheck,
  FiPlus,
  FiX,
  FiTag,
  FiBox,
  FiHash,
  FiArrowLeft
} from "react-icons/fi";

export default function AddProducts() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    productName: "",
    description: "",
    category: "",
    subCategory: "",
    brand: "",
    sku: "",
    
    // Pricing & Stock
    regularPrice: "",
    salePrice: "",
    isActive: true,
    isFeatured: false,
    stockQuantity: "",
    hsnCode: "",
    sellerId: "",
    
    // Media
    images: [],
    
    // Variants
    variants: []
  });

  const categories = [
    "Business Cards",
    "Posters",
    "Brochures",
    "Banners",
    "Flyers",
    "Stationery",
    "Cards",
    "Stickers",
    "Invitations"
  ];

  const subCategories = {
    "Business Cards": ["Standard", "Premium", "Custom Shape", "Foil Printed"],
    "Posters": ["A4", "A3", "A2", "A1", "Large Format"],
    "Brochures": ["Single Fold", "Tri-Fold", "Z-Fold", "Gate Fold"],
    "Banners": ["Vinyl", "Fabric", "Mesh", "Retractable"],
    "Flyers": ["A5", "A6", "DL", "Square"],
    "Stationery": ["Letterheads", "Envelopes", "Business Forms"],
    "Cards": ["Invitation", "Greeting", "Thank You"],
    "Stickers": ["Vinyl", "Paper", "Clear", "Die-cut"],
    "Invitations": ["Wedding", "Birthday", "Corporate", "Event"]
  };

  const brands = [
    "Premium Print",
    "Quality Prints",
    "Express Print",
    "Custom Prints",
    "Elite Printers"
  ];

  const steps = [
    { id: 1, name: "Basic Info", icon: <FiPackage /> },
    { id: 2, name: "Pricing & Stock", icon: <FiDollarSign /> },
    { id: 3, name: "Category Details", icon: <FiLayers /> },
    { id: 4, name: "Media", icon: <FiImage /> },
    { id: 5, name: "Variants", icon: <FiGrid /> }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // In a real app, you would upload these to a server
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      preview: URL.createObjectURL(file)
    }));
    setFormData({
      ...formData,
      images: [...formData.images, ...newImages].slice(0, 5) // Limit to 5 images
    });
  };

  const removeImage = (id) => {
    setFormData({
      ...formData,
      images: formData.images.filter(img => img.id !== id)
    });
  };

  const addVariant = () => {
    const newVariant = {
      id: Date.now(),
      size: "",
      price: "",
      stock: "",
      sku: ""
    };
    setFormData({
      ...formData,
      variants: [...formData.variants, newVariant]
    });
  };

  const updateVariant = (id, field, value) => {
    setFormData({
      ...formData,
      variants: formData.variants.map(variant =>
        variant.id === id ? { ...variant, [field]: value } : variant
      )
    });
  };

  const removeVariant = (id) => {
    setFormData({
      ...formData,
      variants: formData.variants.filter(variant => variant.id !== id)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Product added successfully!');
    navigate("/products"); // Go back to products page after submission
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCancel = () => {
    navigate("/products");
  };

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center">
          <button
            onClick={handleCancel}
            className="mr-4 p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FiArrowLeft />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FiPlus className="mr-3 text-emerald-600" />
              Add New Product
            </h1>
            <p className="text-gray-600 mt-2">Create a new product listing for your printing business</p>
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center mb-4 md:mb-0">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center
                ${currentStep === step.id 
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg' 
                  : currentStep > step.id 
                  ? 'bg-emerald-100 text-emerald-600' 
                  : 'bg-gray-100 text-gray-400'
                }
                transition-all duration-300
              `}>
                {currentStep > step.id ? <FiCheck className="text-lg" /> : step.icon}
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${currentStep >= step.id ? 'text-emerald-600' : 'text-gray-500'}`}>
                  Step {step.id}
                </p>
                <p className="font-semibold text-gray-800">{step.name}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block mx-6">
                  <FiChevronRight className="text-gray-300" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500"
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Start</span>
            <span>{Math.round((currentStep / steps.length) * 100)}% Complete</span>
            <span>Finish</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6">
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-slideIn">
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-gray-800">Basic Information</h2>
              <p className="text-gray-600">Enter the basic details of your product</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300"
                  placeholder="Enter product name"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Subcategory */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subcategory
                </label>
                <select
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleInputChange}
                  disabled={!formData.category}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300 disabled:opacity-50"
                >
                  <option value="">Select Subcategory</option>
                  {formData.category && subCategories[formData.category]?.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300"
                >
                  <option value="">Select Brand</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* SKU */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SKU (Stock Keeping Unit)
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FiHash />
                  </div>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300"
                    placeholder="e.g., PROD-001"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300 resize-none"
                  placeholder="Describe your product in detail..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Pricing & Stock */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-slideIn">
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-gray-800">Pricing & Stock Information</h2>
              <p className="text-gray-600">Set your product pricing and inventory details</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Regular Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Regular Price (₹) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FiDollarSign />
                  </div>
                  <input
                    type="number"
                    name="regularPrice"
                    value={formData.regularPrice}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Sale Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sale Price (₹)
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FiTag />
                  </div>
                  <input
                    type="number"
                    name="salePrice"
                    value={formData.salePrice}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Stock Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FiBox />
                  </div>
                  <input
                    type="number"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* HSN Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  HSN Code
                </label>
                <input
                  type="text"
                  name="hsnCode"
                  value={formData.hsnCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300"
                  placeholder="Enter HSN code"
                />
              </div>

              {/* Seller ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seller ID
                </label>
                <input
                  type="number"
                  name="sellerId"
                  value={formData.sellerId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex items-center space-x-3 cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded flex items-center justify-center ${formData.isActive ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                    {formData.isActive && <FiCheck className="text-white text-sm" />}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-800">Active Product</span>
                  <p className="text-sm text-gray-600">Product will be visible to customers</p>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded flex items-center justify-center ${formData.isFeatured ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                    {formData.isFeatured && <FiCheck className="text-white text-sm" />}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-800">Featured Product</span>
                  <p className="text-sm text-gray-600">Show this product on the homepage</p>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Step 3: Category Details */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-slideIn">
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-gray-800">Category Details</h2>
              <p className="text-gray-600">Additional details based on product category</p>
            </div>

            {!formData.category ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiLayers className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Select a category first</h3>
                <p className="text-gray-600 mb-6">Choose a category from the first step to see specific fields</p>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Go to Step 1
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-emerald-800">Selected Category</p>
                      <p className="text-2xl font-bold text-emerald-900">{formData.category}</p>
                      {formData.subCategory && (
                        <p className="text-emerald-700">Subcategory: {formData.subCategory}</p>
                      )}
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <FiLayers className="text-2xl text-emerald-600" />
                    </div>
                  </div>
                </div>

                {/* Category-specific fields */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Dynamic fields based on category */}
                  {(formData.category === "Business Cards" || formData.category === "Cards") && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Paper Type
                        </label>
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500">
                          <option value="">Select Paper Type</option>
                          <option value="matte">Matte</option>
                          <option value="glossy">Glossy</option>
                          <option value="cardstock">Cardstock</option>
                          <option value="recycled">Recycled</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Print Type
                        </label>
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500">
                          <option value="">Select Print Type</option>
                          <option value="offset">Offset</option>
                          <option value="digital">Digital</option>
                          <option value="foil">Foil Printing</option>
                          <option value="emboss">Embossing</option>
                        </select>
                      </div>
                    </>
                  )}

                  {formData.category === "Posters" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Size
                        </label>
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500">
                          <option value="">Select Size</option>
                          <option value="a4">A4 (210 × 297 mm)</option>
                          <option value="a3">A3 (297 × 420 mm)</option>
                          <option value="a2">A2 (420 × 594 mm)</option>
                          <option value="a1">A1 (594 × 841 mm)</option>
                          <option value="custom">Custom Size</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Paper Weight (gsm)
                        </label>
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500">
                          <option value="">Select Weight</option>
                          <option value="150">150 GSM</option>
                          <option value="200">200 GSM</option>
                          <option value="250">250 GSM</option>
                          <option value="300">300 GSM</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* Additional generic fields */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                          Additional Specifications
                        </label>
                        <textarea
                          rows="3"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 resize-none"
                          placeholder="Add any additional specifications or requirements..."
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

        {/* Step 4: Media */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-slideIn">
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-gray-800">Product Images</h2>
              <p className="text-gray-600">Upload images for your product (Max 5MB each)</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upload Area */}
              <div className="lg:col-span-2">
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-emerald-400 transition-colors group">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiUpload className="text-2xl text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Images</h3>
                  <p className="text-gray-600 mb-4">Drag & drop images here or click to browse</p>
                  <p className="text-sm text-gray-500 mb-6">Supports JPG, PNG, WebP (Max 5MB each)</p>
                  <label className="inline-block px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors cursor-pointer">
                    Browse Files
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Uploaded Images Preview */}
              {formData.images.length > 0 && (
                <div className="lg:col-span-2">
                  <h4 className="font-medium text-gray-800 mb-4">Uploaded Images ({formData.images.length}/5)</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {formData.images.map((image) => (
                      <div key={image.id} className="relative group">
                        <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                          <img
                            src={image.preview}
                            alt={image.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                        >
                          <FiX className="text-sm" />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-2 truncate">
                          {image.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 5: Variants */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-slideIn">
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-gray-800">Size Variants</h2>
              <p className="text-gray-600">Add different sizes and variations of your product</p>
            </div>

            {formData.variants.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiGrid className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No size variants added yet</h3>
                <p className="text-gray-600 mb-6">Add your first size variant to get started</p>
                <button
                  type="button"
                  onClick={addVariant}
                  className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors flex items-center space-x-2 mx-auto"
                >
                  <FiPlus />
                  <span>Add First Variant</span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Variants List */}
                {formData.variants.map((variant, index) => (
                  <div key={variant.id} className="border border-gray-200 rounded-2xl p-6 hover:border-emerald-300 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-800">Variant #{index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeVariant(variant.id)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <FiX />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Size/Variant Name
                        </label>
                        <input
                          type="text"
                          value={variant.size}
                          onChange={(e) => updateVariant(variant.id, 'size', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                          placeholder="e.g., A4, Large, Small"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price (₹)
                        </label>
                        <input
                          type="number"
                          value={variant.price}
                          onChange={(e) => updateVariant(variant.id, 'price', e.target.value)}
                          min="0"
                          step="0.01"
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Stock
                        </label>
                        <input
                          type="number"
                          value={variant.stock}
                          onChange={(e) => updateVariant(variant.id, 'stock', e.target.value)}
                          min="0"
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          SKU
                        </label>
                        <input
                          type="text"
                          value={variant.sku}
                          onChange={(e) => updateVariant(variant.id, 'sku', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                          placeholder="e.g., VAR-001"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Another Variant Button */}
                <button
                  type="button"
                  onClick={addVariant}
                  className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-emerald-400 hover:bg-emerald-50 transition-colors group"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <FiPlus className="text-emerald-600" />
                    <span className="font-medium text-emerald-600">Add Another Variant</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Add more size or variant options</p>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 border-t border-gray-200 mt-8">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-8 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
              >
                Previous
              </button>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-8 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Add Product
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Form Summary */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Form Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-xl">
            <p className="text-sm text-blue-600 font-medium mb-2">Completed Steps</p>
            <p className="text-2xl font-bold text-blue-700">{currentStep - 1}</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl">
            <p className="text-sm text-emerald-600 font-medium mb-2">Current Step</p>
            <p className="text-2xl font-bold text-emerald-700">{steps[currentStep - 1]?.name}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl">
            <p className="text-sm text-purple-600 font-medium mb-2">Remaining Steps</p>
            <p className="text-2xl font-bold text-purple-700">{steps.length - currentStep}</p>
          </div>
        </div>
      </div>
    </div>
  );
}