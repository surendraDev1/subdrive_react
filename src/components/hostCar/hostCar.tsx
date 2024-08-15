import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CarDetails {
  model: string;
  year: string;
  miles: string;
  carNumber: string;
  pickupStreet: string;
  pickupPincode: string;
  images: File[];
  documents: File[];
}

interface FormErrors {
  model?: string;
  year?: string;
  miles?: string;
  carNumber?: string;
  pickupStreet?: string;
  pickupPincode?: string;
  images?: string;
  documents?: string;
}

const STORAGE_KEY = 'carHostingFormData';

const MultiStepForm: React.FC = () => {
  const [carDetails, setCarDetails] = useState<CarDetails>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      parsedData.images = [];
      parsedData.documents = [];
      return parsedData;
    }
    return {
      model: '',
      year: '',
      miles: '',
      carNumber: '',
      pickupStreet: '',
      pickupPincode: '',
      images: [],
      documents: [],
    };
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem(STORAGE_KEY + '_step');
    return savedStep ? parseInt(savedStep, 10) : 1;
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carDetails));
  }, [carDetails]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_step', step.toString());
  }, [step]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const files = e.target.files;
      if (files) {
        setCarDetails(prev => ({ ...prev, [name]: Array.from(files) }));
        if (name === 'images') {
          const previews = Array.from(files).map(file => URL.createObjectURL(file));
          setPreviewImages(previews);
        }
      }
    } else {
      setCarDetails(prev => ({ ...prev, [name]: value }));
    }
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateStep = (): boolean => {
    const newErrors: FormErrors = {};
    switch (step) {
      case 1:
        if (!carDetails.model) newErrors.model = 'Model is required';
        const yearNum = parseInt(carDetails.year, 10);
        if (isNaN(yearNum) || yearNum < 1900 || yearNum > new Date().getFullYear()) newErrors.year = 'Invalid year';
        break;
      case 2:
        const milesNum = parseFloat(carDetails.miles);
        if (isNaN(milesNum) || milesNum < 0) newErrors.miles = 'Invalid mileage';
        if (carDetails.carNumber.length !== 7) newErrors.carNumber = 'Car number must be 7 characters long';
        break;
      case 3:
        if (!carDetails.pickupStreet) newErrors.pickupStreet = 'Street address is required';
        if (!/^\d{6}$/.test(carDetails.pickupPincode)) newErrors.pickupPincode = 'Pincode must be 6 digits';
        break;
      case 4:
        if (carDetails.images.length === 0) newErrors.images = 'At least one image is required';
        if (carDetails.documents.length === 0) newErrors.documents = 'Documents are required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prevStep => Math.min(prevStep + 1, 5));
    }
  };

  const handlePrevious = () => {
    setStep(prevStep => Math.max(prevStep - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      console.log('Form submitted:', carDetails);
      setIsSubmitted(true);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_KEY + '_step');
    } else {
      console.log('Form has errors');
    }
  };

  const renderProgressBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <div
          key={i}
          style={{
            width: '20%',
            height: '8px',
            backgroundColor: i <= step ? '#4CAF50' : '#e0e0e0',
            transition: 'background-color 0.3s',
          }}
        />
      ))}
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <h2>Step 1: Car Model and Year</h2>
            <div>
              <label htmlFor="model">Car Model:</label>
              <input
                type="text"
                id="model"
                name="model"
                value={carDetails.model}
                onChange={handleInputChange}
                required
              />
              {errors.model && <span style={{color: 'red'}}>{errors.model}</span>}
            </div>
            <div>
              <label htmlFor="year">Year:</label>
              <input
                type="number"
                id="year"
                name="year"
                value={carDetails.year}
                onChange={handleInputChange}
                required
              />
              {errors.year && <span style={{color: 'red'}}>{errors.year}</span>}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <h2>Step 2: Car Details</h2>
            <div>
              <label htmlFor="miles">Miles Driven:</label>
              <input
                type="number"
                id="miles"
                name="miles"
                value={carDetails.miles}
                onChange={handleInputChange}
                required
              />
              {errors.miles && <span style={{color: 'red'}}>{errors.miles}</span>}
            </div>
            <div>
              <label htmlFor="carNumber">Car Number:</label>
              <input
                type="text"
                id="carNumber"
                name="carNumber"
                value={carDetails.carNumber}
                onChange={handleInputChange}
                maxLength={7}
                required
              />
              {errors.carNumber && <span style={{color: 'red'}}>{errors.carNumber}</span>}
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <h2>Step 3: Pickup Location</h2>
            <div>
              <label htmlFor="pickupStreet">Street Address:</label>
              <input
                type="text"
                id="pickupStreet"
                name="pickupStreet"
                value={carDetails.pickupStreet}
                onChange={handleInputChange}
                required
              />
              {errors.pickupStreet && <span style={{color: 'red'}}>{errors.pickupStreet}</span>}
            </div>
            <div>
              <label htmlFor="pickupPincode">Pincode:</label>
              <input
                type="text"
                id="pickupPincode"
                name="pickupPincode"
                value={carDetails.pickupPincode}
                onChange={handleInputChange}
                maxLength={6}
                required
              />
              {errors.pickupPincode && <span style={{color: 'red'}}>{errors.pickupPincode}</span>}
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <h2>Step 4: Images and Documents</h2>
            <div>
              <label htmlFor="images">Car Images:</label>
              <input
                type="file"
                id="images"
                name="images"
                onChange={handleInputChange}
                multiple
                accept="image/*"
                required
              />
              {errors.images && <span style={{color: 'red'}}>{errors.images}</span>}
            </div>
            <div>
              <label htmlFor="documents">Car Documents:</label>
              <input
                type="file"
                id="documents"
                name="documents"
                onChange={handleInputChange}
                multiple
                accept=".pdf,.doc,.docx"
                required
              />
              {errors.documents && <span style={{color: 'red'}}>{errors.documents}</span>}
            </div>
            {previewImages.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                {previewImages.map((src, index) => (
                  <img key={index} src={src} alt={`Preview ${index + 1}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                ))}
              </div>
            )}
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <h2>Step 5: Review and Submit</h2>
            <p>Please review your information before submitting.</p>
            <div>
              <h3>Car Details</h3>
              <p>Model: {carDetails.model}</p>
              <p>Year: {carDetails.year}</p>
              <p>Miles: {carDetails.miles}</p>
              <p>Car Number: {carDetails.carNumber}</p>
            </div>
            <div>
              <h3>Pickup Location</h3>
              <p>Street: {carDetails.pickupStreet}</p>
              <p>Pincode: {carDetails.pickupPincode}</p>
            </div>
            <div>
              <h3>Uploads</h3>
              <p>Images: {carDetails.images.length} file(s)</p>
              <p>Documents: {carDetails.documents.length} file(s)</p>
            </div>
            {previewImages.length > 0 && (
              <div>
                <h3>Image Previews</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {previewImages.map((src, index) => (
                    <img key={index} src={src} alt={`Preview ${index + 1}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        );
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', textAlign: 'center' }}
      >
        <h2 style={{ color: 'green' }}>Submission Successful!</h2>
        <p>Thank you for hosting your car. We will review your submission and get back to you soon.</p>
        <button onClick={() => {
          setIsSubmitted(false);
          setStep(1);
          setCarDetails({
            model: '',
            year: '',
            miles: '',
            carNumber: '',
            pickupStreet: '',
            pickupPincode: '',
            images: [],
            documents: [],
          });
          setPreviewImages([]);
        }} style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', marginTop: '20px' }}>
          Host Another Car
        </button>
      </motion.div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Host Your Car</h1>
      {renderProgressBar()}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <AnimatePresence mode="wait">
          {renderStepContent()}
        </AnimatePresence>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          {step > 1 && (
            <button type="button" onClick={handlePrevious} style={{ padding: '10px 20px', backgroundColor: '#808080', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>
              Previous
            </button>
          )}
          {step < 5 ? (
            <button type="button" onClick={handleNext} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>
              {step === 4 ? 'Review' : 'Next'}
            </button>
          ) : (
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;