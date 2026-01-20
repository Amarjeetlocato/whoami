// Contact page-specific JS
document.addEventListener('DOMContentLoaded', ()=>{
    
    
    document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();

  const formData = Object.fromEntries(
    new FormData(e.target).entries()
  );

  fetch("https://script.google.com/macros/s/AKfycbwGfXWnE9IA_LbQDSkV1vi8mYiN_llGXMLwHcPGAhbOJ5woYMC-iaffa0fLROuymBUx/exec", {
    method: "POST",
    body: JSON.stringify(formData)
  })
  .then(res => res.json())
  .then(() => {
    // Redirect to thank you page after successful submission
    window.location.href = 'thank-you.html';
  })
  .catch(err => {
    console.error('Error:', err);
    alert("There was an error sending your message. Please try again.");
  });
 
});
    
    
 
    
    
    
    /* contact page hook */ });




 