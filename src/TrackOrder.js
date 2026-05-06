import React, { useState, useEffect } from 'react';

const TrackOrder = ({ orderId, onBack, lastOrder, onOpenChat, customerName }) => {
  // 1. PINAKA-IMPORTANTENG LINE: Dapat unique per orderId ang key
  const [currentStepIndex, setCurrentStepIndex] = useState(() => {
    const savedStep = localStorage.getItem(`glow_step_progress_${orderId}`);
    return savedStep ? parseInt(savedStep) : 0;
  });

  useEffect(() => {
    if (lastOrder && lastOrder.length > 0 && currentStepIndex < 4) {
      const timer = setTimeout(() => {
        const nextStep = currentStepIndex + 1;
        setCurrentStepIndex(nextStep);
        // 2. SAVE PROGRESS: Sinisiguro na naitatabi ang progress sa bawat step
        localStorage.setItem(`glow_step_progress_${orderId}`, nextStep.toString());
      }, 20000); // 20 Seconds delay

      return () => clearTimeout(timer);
    }
  }, [currentStepIndex, lastOrder, orderId]);

  // Rider selection logic
  const riderPool = [
    { name: "Ricardo 'Ric' Santos", plate: "NCR-1234", rating: "4.9" },
    { name: "John Mark Bautista", plate: "PHP-5532", rating: "4.8" },
    { name: "Arnel Dela Cruz", plate: "ZXC-1099", rating: "5.0" }
  ];
  const riderIndex = orderId ? orderId.length % riderPool.length : 0;
  const currentRider = riderPool[riderIndex];

  const trackingSteps = [
    { status: 'Order Placed', desc: 'Order received and confirmed.' },
    { status: 'Payment Confirmed', desc: 'Payment verified via GCash/Card.' },
    { status: 'Packing', desc: 'Items are being prepared at GLOW Warehouse.' },
    { status: 'On the Way', desc: `${currentRider.name} is heading to you.` },
    { status: 'Delivered', desc: 'Order received. Thank you for glowing!' }
  ];

  const progressWidth = (currentStepIndex / (trackingSteps.length - 1)) * 100;

  return (
    <div className="container py-4 animate__animated animate__fadeIn" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="mx-auto" style={{ maxWidth: '650px' }}>
        
        {/* HEADER */}
        <div className="mb-4 d-flex justify-content-between align-items-end px-2">
          <div>
            <p className="text-muted mb-0 small fw-bold text-uppercase">Customer Name</p>
            <h5 className="fw-bold mb-0" style={{ color: '#b0926a' }}>{customerName || "Valued Customer"}</h5>
          </div>
          <div className="text-end">
            <p className="text-muted mb-0 small fw-bold text-uppercase">Order ID</p>
            <p className="font-monospace mb-0 fw-bold">{orderId}</p>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body bg-white py-4 px-4">
            <div className="d-flex justify-content-between mb-2 small fw-bold text-muted">
              <span>Warehouse</span>
              <span style={{ color: '#b0926a' }}>
                {currentStepIndex === 4 ? "Delivered" : currentStepIndex >= 3 ? "In Transit" : "Processing"}
              </span>
              <span>Home</span>
            </div>
            <div className="progress rounded-pill" style={{ height: '10px', backgroundColor: '#e9ecef' }}>
              <div className="progress-bar progress-bar-striped progress-bar-animated"
                style={{ 
                  width: `${progressWidth}%`, 
                  backgroundColor: currentStepIndex === 4 ? '#198754' : '#b0926a', 
                  transition: 'width 2s ease-in-out' 
                }}>
              </div>
            </div>
          </div>
        </div>

        {/* ORDER SUMMARY - Dito natin ilalagay ang pictures */}
        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-header bg-white border-0 pt-3 px-4">
            <h6 className="fw-bold mb-0">Order Summary</h6>
          </div>
          <div className="card-body px-4">
            {lastOrder.map((item, index) => (
              <div key={index} className="d-flex align-items-center mb-3">
                {/* 3. PRODUCT IMAGE FIX */}
                <div className="rounded-3 border overflow-hidden me-3" style={{ width: '55px', height: '55px', flexShrink: 0 }}>
                  <img 
                    src={item.image || item.img || 'https://via.placeholder.com/55'} 
                    alt={item.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between small fw-bold">
                    <span>{item.quantity}x {item.name}</span>
                    <span>₱{item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
            <hr className="text-muted opacity-25" />
            <div className="d-flex justify-content-between fw-bold">
              <span>Total Paid</span>
              <span style={{ color: '#b0926a' }}>₱{lastOrder.reduce((t, i) => t + (i.price * i.quantity), 0)}</span>
            </div>
          </div>
        </div>

        {/* RIDER INFO CARD (Lalabas lang kung nasa 'On the Way' pataas) */}
        {currentStepIndex >= 3 && (
          <div className="card border-0 shadow-sm rounded-4 mb-4 bg-white animate__animated animate__fadeInUp">
            <div className="card-body d-flex align-items-center p-3">
              <div className="rounded-circle border" style={{ width: '55px', height: '55px', overflow: 'hidden' }}>
                <img src={`https://ui-avatars.com/api/?name=${currentRider.name}&background=b0926a&color=fff`} alt="Rider" style={{ width: '100%' }} />
              </div>
              <div className="ms-3 flex-grow-1">
                <h6 className="fw-bold mb-0">{currentRider.name}</h6>
                <div className="small text-muted">{currentRider.rating} ★ | {currentRider.plate}</div>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-light rounded-circle shadow-sm" onClick={() => onOpenChat(currentRider.name)} style={{ color: '#b0926a' }}><i className="bi bi-chat-dots-fill"></i></button>
                <a href="tel:09123456789" className="btn btn-light rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{ color: '#b0926a' }}><i className="bi bi-telephone-fill"></i></a>
              </div>
            </div>
          </div>
        )}

        {/* TIMELINE */}
        <div className="card border-0 shadow-sm rounded-4 mb-4 p-4">
          {trackingSteps.map((step, index) => (
            <div key={index} className="d-flex mb-4 position-relative">
              {index !== trackingSteps.length - 1 && (
                <div className="position-absolute" style={{ left: '11px', top: '24px', bottom: '-24px', width: '2px', backgroundColor: index < currentStepIndex ? '#198754' : '#e9ecef' }}></div>
              )}
              <div className={`rounded-circle d-flex align-items-center justify-content-center position-relative ${index <= currentStepIndex ? 'bg-success text-white' : 'bg-white text-muted border'}`}
                style={{ width: '24px', height: '24px', zIndex: 2, fontSize: '0.7rem' }}>
                {index <= currentStepIndex ? <i className="bi bi-check"></i> : <i className="bi bi-circle"></i>}
              </div>
              <div className="ms-3">
                <div className={`fw-bold small ${index <= currentStepIndex ? 'text-dark' : 'text-muted'}`}>{step.status}</div>
                <div className="text-muted" style={{ fontSize: '0.75rem' }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <button className="btn btn-outline-secondary w-100 rounded-pill fw-bold py-3" onClick={onBack}>BACK TO SHOP</button>
      </div>
    </div>
  );
};

export default TrackOrder;