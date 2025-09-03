import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, Target, Zap, Award, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';

interface ExperienceDetailModalProps {
  experience: {
    id: number;
    title: string;
    company: string;
    location: string;
    period: string;
    type: string;
    achievements: string[];
    detailedDescription?: string;
    skills?: string[];
    challenges?: string[];
    impact?: string;
    highlights?: string[];
    images?: string[];
    certifications?: string[];
  };
  isOpen: boolean;
  onClose: () => void;
}

export const ExperienceDetailModal: React.FC<ExperienceDetailModalProps> = ({ experience, isOpen, onClose }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxClosing, setLightboxClosing] = useState(false);
  const [modalClosing, setModalClosing] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle closing animations
  const handleClose = () => {
    setModalClosing(true);
    setTimeout(() => {
      setModalClosing(false);
      onClose();
    }, 300); // Match animation duration
  };

  const closeLightbox = () => {
    setLightboxClosing(true);
    setTimeout(() => {
      setLightboxClosing(false);
      setLightboxOpen(false);
    }, 300); // Match animation duration
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch(e.key) {
        case 'Escape':
          if (lightboxOpen && !lightboxClosing) {
            closeLightbox();
          } else if (!modalClosing) {
            handleClose();
          }
          break;
        case 'ArrowLeft':
          if (lightboxOpen && !lightboxClosing) {
            navigateImage(-1);
          }
          break;
        case 'ArrowRight':
          if (lightboxOpen && !lightboxClosing) {
            navigateImage(1);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [lightboxOpen, lightboxClosing, modalClosing, currentImageIndex, experience?.images?.length, isOpen]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    setLightboxClosing(false);
  };

  const navigateImage = (direction: number) => {
    if (!experience?.images) return;
    
    const newIndex = currentImageIndex + direction;
    if (newIndex >= 0 && newIndex < experience.images.length) {
      setCurrentImageIndex(newIndex);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: modalClosing ? 'modalFadeOut 0.3s ease-out' : 'modalFadeIn 0.3s ease-out'
      }}
      onClick={handleClose}
    >
      <div 
        className="modal-content energy-card"
        style={{
          maxWidth: '90vw',
          maxHeight: '90vh',
          width: '1200px',
          backgroundColor: 'hsl(var(--background))',
          border: '2px solid hsl(var(--primary) / 0.3)',
          borderRadius: '16px',
          overflow: 'hidden',
          position: 'relative',
          animation: modalClosing ? 'modalSlideOut 0.3s ease-out' : 'modalSlideIn 0.3s ease-out',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="modal-header"
          style={{
            padding: 'clamp(1rem, 4vw, 2rem)',
            borderBottom: '1px solid hsl(var(--primary) / 0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexShrink: 0
          }}
        >
          <div style={{ flex: 1, marginRight: '1rem' }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
              fontWeight: 'bold',
              color: 'hsl(var(--primary))',
              marginBottom: 'clamp(0.25rem, 1vw, 0.5rem)',
              textShadow: '0 0 20px hsl(var(--primary) / 0.3)',
              lineHeight: 1.2
            }}>
              {experience.title}
            </h2>
            <p style={{
              fontSize: 'clamp(0.875rem, 3vw, 1.25rem)',
              color: 'hsl(var(--foreground))',
              fontWeight: 600,
              marginBottom: 'clamp(0.5rem, 2vw, 1rem)',
              lineHeight: 1.3
            }}>
              {experience.company}
            </p>
            <div style={{ 
              display: 'flex', 
              gap: 'clamp(0.5rem, 2vw, 1rem)', 
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <span style={{
                padding: 'clamp(0.25rem, 1vw, 0.5rem) clamp(0.5rem, 2vw, 1rem)',
                borderRadius: '9999px',
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                fontWeight: 'bold',
                backgroundColor: experience.type === 'INTERNSHIP' 
                  ? 'hsl(var(--primary) / 0.2)' 
                  : 'hsl(var(--primary) / 0.2)',
                color: 'hsl(var(--primary))',
                textTransform: 'uppercase'
              }}>
                {experience.type}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Calendar size={14} style={{ color: 'hsl(var(--primary))' }} />
                <span style={{ 
                  color: 'hsl(var(--muted-foreground))', 
                  fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' 
                }}>
                  {experience.period}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <MapPin size={14} style={{ color: 'hsl(var(--primary))' }} />
                <span style={{ 
                  color: 'hsl(var(--muted-foreground))', 
                  fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' 
                }}>
                  {experience.location}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={handleClose}
            style={{
              padding: 'clamp(0.25rem, 1vw, 0.5rem)',
              backgroundColor: 'hsl(var(--primary) / 0.1)',
              border: '1px solid hsl(var(--primary) / 0.3)',
              borderRadius: '8px',
              color: 'hsl(var(--primary))',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'hsl(var(--primary) / 0.2)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'hsl(var(--primary) / 0.1)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div 
          className="modal-content-area"
          style={{
            overflowY: 'auto',
            maxHeight: 'calc(90vh - 140px)',
            padding: 'clamp(1rem, 4vw, 2rem)',
            flex: 1
          }}
        >
          <div style={{
            maxWidth: '100%'
          }}>
            {/* Description */}
            {experience.detailedDescription && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'hsl(var(--primary))',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Target size={20} />
                  Overview
                </h3>
                <p style={{
                  color: 'hsl(var(--foreground) / 0.9)',
                  lineHeight: 1.7,
                  fontSize: '1.1rem'
                }}>
                  {experience.detailedDescription}
                </p>
              </div>
            )}

            {/* Key Skills & Technologies */}
            {experience.skills && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'hsl(var(--primary))',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Zap size={20} />
                  Skills & Technologies
                </h3>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}>
                  {experience.skills.map((skill, index) => (
                    <span 
                      key={index}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: 'hsl(var(--primary) / 0.1)',
                        border: '2px solid hsl(var(--primary) / 0.3)',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        color: 'hsl(var(--primary))',
                        fontFamily: 'monospace',
                        fontWeight: 'bold',
                        boxShadow: '0 0 10px hsl(var(--primary) / 0.2)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Key Achievements */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'hsl(var(--primary))',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Award size={20} />
                Key Achievements
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0
              }}>
                {experience.achievements.map((achievement, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    marginBottom: '0.75rem',
                    color: 'hsl(var(--foreground) / 0.9)',
                    fontSize: '1rem',
                    lineHeight: 1.6
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      backgroundColor: 'hsl(var(--primary))',
                      borderRadius: '50%',
                      marginTop: '0.5rem',
                      boxShadow: '0 0 6px hsl(var(--primary))',
                      flexShrink: 0
                    }} />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>

            {/* Impact */}
            {experience.impact && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'hsl(var(--primary))',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <TrendingUp size={20} />
                  Professional Impact
                </h3>
                <p style={{
                  color: 'hsl(var(--foreground) / 0.9)',
                  lineHeight: 1.7,
                  fontSize: '1.1rem'
                }}>
                  {experience.impact}
                </p>
              </div>
            )}

            {/* Challenges */}
            {experience.challenges && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'hsl(var(--primary))',
                  marginBottom: '1rem'
                }}>
                  Challenges & Learning
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0
                }}>
                  {experience.challenges.map((challenge, index) => (
                    <li key={index} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                      marginBottom: '0.75rem',
                      color: 'hsl(var(--foreground) / 0.9)',
                      fontSize: '1rem',
                      lineHeight: 1.6
                    }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: 'hsl(var(--primary))',
                        borderRadius: '50%',
                        marginTop: '0.5rem',
                        boxShadow: '0 0 6px hsl(var(--primary))',
                        flexShrink: 0
                      }} />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Highlights */}
            {experience.highlights && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'hsl(var(--primary))',
                  marginBottom: '1rem'
                }}>
                  Notable Highlights
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0
                }}>
                  {experience.highlights.map((highlight, index) => (
                    <li key={index} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                      marginBottom: '0.5rem',
                      color: 'hsl(var(--foreground) / 0.9)',
                      fontSize: '1rem',
                      lineHeight: 1.6
                    }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: 'hsl(var(--primary))',
                        borderRadius: '50%',
                        marginTop: '0.5rem',
                        boxShadow: '0 0 6px hsl(var(--primary))',
                        flexShrink: 0
                      }} />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Images */}
            {experience.images && experience.images.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'hsl(var(--primary))',
                  marginBottom: '1rem'
                }}>
                  Gallery
                </h3>
                <div 
                  className="images-grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '2rem'
                  }}
                >
                  {experience.images.map((image, index) => (
                    <div key={index} style={{
                      border: '2px solid hsl(var(--primary) / 0.3)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 0 20px hsl(var(--primary) / 0.1)',
                      transition: 'all 0.3s ease'
                    }}>
                      <img
                        src={image}
                        alt={`${experience.title} image ${index + 1}`}
                        style={{
                          width: '100%',
                          height: 'auto',
                          display: 'block',
                          cursor: 'pointer'
                        }}
                        onClick={() => openLightbox(index)}
                        onMouseEnter={(e) => {
                          e.currentTarget.parentElement!.style.transform = 'scale(1.02)';
                          e.currentTarget.parentElement!.style.boxShadow = '0 0 30px hsl(var(--primary) / 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.parentElement!.style.transform = 'scale(1)';
                          e.currentTarget.parentElement!.style.boxShadow = '0 0 20px hsl(var(--primary) / 0.1)';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Lightbox */}
      {(lightboxOpen || lightboxClosing) && experience.images && (
        <div 
          className="lightbox-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(10px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: lightboxClosing ? 'lightboxFadeOut 0.3s ease-out' : 'lightboxFadeIn 0.3s ease-out'
          }}
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              padding: '0.75rem',
              backgroundColor: 'hsl(var(--primary) / 0.2)',
              border: '2px solid hsl(var(--primary) / 0.5)',
              borderRadius: '50%',
              color: 'hsl(var(--primary))',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              zIndex: 2001,
              boxShadow: '0 0 20px hsl(var(--primary) / 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'hsl(var(--primary) / 0.3)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'hsl(var(--primary) / 0.2)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <X size={24} />
          </button>

          {/* Navigation Arrows */}
          {experience.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage(-1);
                }}
                disabled={currentImageIndex === 0}
                style={{
                  position: 'absolute',
                  left: '2rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  padding: '1rem',
                  backgroundColor: 'hsl(var(--primary) / 0.2)',
                  border: '2px solid hsl(var(--primary) / 0.5)',
                  borderRadius: '50%',
                  color: currentImageIndex === 0 ? 'hsl(var(--muted-foreground))' : 'hsl(var(--primary))',
                  cursor: currentImageIndex === 0 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  zIndex: 2001,
                  opacity: currentImageIndex === 0 ? 0.5 : 1,
                  boxShadow: '0 0 20px hsl(var(--primary) / 0.3)'
                }}
                onMouseEnter={(e) => {
                  if (currentImageIndex > 0) {
                    e.currentTarget.style.backgroundColor = 'hsl(var(--primary) / 0.3)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'hsl(var(--primary) / 0.2)';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage(1);
                }}
                disabled={currentImageIndex === experience.images.length - 1}
                style={{
                  position: 'absolute',
                  right: '2rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  padding: '1rem',
                  backgroundColor: 'hsl(var(--primary) / 0.2)',
                  border: '2px solid hsl(var(--primary) / 0.5)',
                  borderRadius: '50%',
                  color: currentImageIndex === experience.images.length - 1 ? 'hsl(var(--muted-foreground))' : 'hsl(var(--primary))',
                  cursor: currentImageIndex === experience.images.length - 1 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  zIndex: 2001,
                  opacity: currentImageIndex === experience.images.length - 1 ? 0.5 : 1,
                  boxShadow: '0 0 20px hsl(var(--primary) / 0.3)'
                }}
                onMouseEnter={(e) => {
                  if (currentImageIndex < experience.images.length - 1) {
                    e.currentTarget.style.backgroundColor = 'hsl(var(--primary) / 0.3)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'hsl(var(--primary) / 0.2)';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Image Container */}
          <div 
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '1rem'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={experience.images[currentImageIndex]}
              alt={`${experience.title} image ${currentImageIndex + 1}`}
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
                border: '3px solid hsl(var(--primary) / 0.5)',
                borderRadius: '8px',
                boxShadow: '0 0 50px hsl(var(--primary) / 0.3)',
                animation: lightboxClosing ? 'lightboxImageOut 0.3s ease-out' : 'lightboxImageIn 0.3s ease-out'
              }}
            />
            
            {/* Image Counter */}
            <div style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: 'hsl(var(--primary) / 0.1)',
              border: '1px solid hsl(var(--primary) / 0.3)',
              borderRadius: '20px',
              color: 'hsl(var(--primary))',
              fontSize: '0.875rem',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              {currentImageIndex + 1} / {experience.images.length}
            </div>

            {/* Instructions */}
            <div style={{
              marginTop: '0.5rem',
              color: 'hsl(var(--muted-foreground))',
              fontSize: '0.75rem',
              textAlign: 'center',
              opacity: 0.7
            }}>
              Use arrow keys to navigate • ESC to close
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes modalSlideIn {
          from { 
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes modalFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes modalSlideOut {
          from { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          to { 
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
        }

        @keyframes lightboxFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes lightboxFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes lightboxImageIn {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes lightboxImageOut {
          from { 
            opacity: 1;
            transform: scale(1);
          }
          to { 
            opacity: 0;
            transform: scale(0.95);
          }
        }

        @media (max-width: 768px) {
          .modal-content {
            width: 95vw !important;
            height: 95vh !important;
            max-height: 95vh !important;
          }

          .images-grid {
            grid-template-columns: 1fr !important;
          }

          .lightbox-overlay button {
            padding: 0.5rem !important;
          }

          .lightbox-overlay button:first-child {
            top: 1rem !important;
            right: 1rem !important;
          }

          .lightbox-overlay button:nth-child(2) {
            left: 1rem !important;
          }

          .lightbox-overlay button:last-of-type {
            right: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};