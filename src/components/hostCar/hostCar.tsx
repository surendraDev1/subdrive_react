import React, { useState } from 'react';

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

const HostCar: React.FC = () => {
  const [carDetails, setCarDetails] = useState<CarDetails>({
    model: '',
    year: '',
    miles: '',
    carNumber: '',
    pickupStreet: '',
    pickupPincode: '',
    images: [],
    documents: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const files = e.target.files;
      setCarDetails(prev => ({ ...prev, [name]: files ? Array.from(files) : [] }));
    } else {
      setCarDetails(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateStep = (): boolean => {
    const newErrors: FormErrors = {};
    if (step === 1) {
      if (!carDetails.model) newErrors.model = 'Model is required';
      const yearNum = parseInt(carDetails.year, 10);
      if (isNaN(yearNum) || yearNum < 1900 || yearNum > new Date().getFullYear()) newErrors.year = 'Invalid year';
      const milesNum = parseFloat(carDetails.miles);
      if (isNaN(milesNum) || milesNum < 0) newErrors.miles = 'Invalid mileage';
      if (carDetails.carNumber.length !== 7) newErrors.carNumber = 'Car number must be 7 characters long';
    } else if (step === 2) {
      if (!carDetails.pickupStreet) newErrors.pickupStreet = 'Street address is required';
      if (!/^\d{6}$/.test(carDetails.pickupPincode)) newErrors.pickupPincode = 'Pincode must be 6 digits';
    } else if (step === 3) {
      if (carDetails.images.length === 0) newErrors.images = 'At least one image is required';
      if (carDetails.documents.length === 0) newErrors.documents = 'Documents are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      console.log('Form submitted:', carDetails);
      // Here you would typically send the data to your backend
      setIsSubmitted(true);
    } else {
      console.log('Form has errors');
    }
  };

  if (isSubmitted) {
    return (
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
        <h2 style={{ color: 'green' }}>Submission Successful!</h2>
        <p>Thank you for hosting your car. We will review your submission and get back to you soon.</p>
        <button onClick={() => setIsSubmitted(false)} style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', marginTop: '20px' }}>
          Submit Another Car
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Host Your Car</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {step === 1 && (
          <div>
            <div>
              <label htmlFor="model">Car Model:</label>
              <input type="text" id="model" name="model" value={carDetails.model} onChange={handleInputChange} required style={{ width: '100%', padding: '5px' }} />
              {errors.model && <span style={{ color: 'red' }}>{errors.model}</span>}
            </div>

            <div>
              <label htmlFor="year">Year:</label>
              <input type="number" id="year" name="year" value={carDetails.year} onChange={handleInputChange} required style={{ width: '100%', padding: '5px' }} />
              {errors.year && <span style={{ color: 'red' }}>{errors.year}</span>}
            </div>

            <div>
              <label htmlFor="miles">Miles Driven:</label>
              <input type="number" id="miles" name="miles" value={carDetails.miles} onChange={handleInputChange} required style={{ width: '100%', padding: '5px' }} />
              {errors.miles && <span style={{ color: 'red' }}>{errors.miles}</span>}
            </div>

            <div>
              <label htmlFor="carNumber">Car Number (7 characters):</label>
              <input type="text" id="carNumber" name="carNumber" value={carDetails.carNumber} onChange={handleInputChange} maxLength={7} required style={{ width: '100%', padding: '5px' }} />
              {errors.carNumber && <span style={{ color: 'red' }}>{errors.carNumber}</span>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div>
              <label htmlFor="pickupStreet">Pickup Street Address:</label>
              <input type="text" id="pickupStreet" name="pickupStreet" value={carDetails.pickupStreet} onChange={handleInputChange} required style={{ width: '100%', padding: '5px' }} />
              {errors.pickupStreet && <span style={{ color: 'red' }}>{errors.pickupStreet}</span>}
            </div>

            <div>
              <label htmlFor="pickupPincode">Pickup Pincode:</label>
              <input type="text" id="pickupPincode" name="pickupPincode" value={carDetails.pickupPincode} onChange={handleInputChange} maxLength={6} required style={{ width: '100%', padding: '5px' }} />
              {errors.pickupPincode && <span style={{ color: 'red' }}>{errors.pickupPincode}</span>}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div>
              <label htmlFor="images">Car Images:</label>
              <input type="file" id="images" name="images" onChange={handleInputChange} multiple required style={{ width: '100%', padding: '5px' }} />
              {errors.images && <span style={{ color: 'red' }}>{errors.images}</span>}
            </div>

            <div>
              <label htmlFor="documents">Car Documents (Insurance, Registration, etc.):</label>
              <input type="file" id="documents" name="documents" onChange={handleInputChange} multiple required style={{ width: '100%', padding: '5px' }} />
              {errors.documents && <span style={{ color: 'red' }}>{errors.documents}</span>}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {step > 1 && <button type="button" onClick={handlePrev} style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Previous</button>}
          {step < 3 && <button type="button" onClick={handleNext} style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Next</button>}
          {step === 3 && <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Submit</button>}
        </div>
      </form>
    </div>
  );
};

export default HostCar;