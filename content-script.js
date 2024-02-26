(function () {
  console.log("DANGER! Tailwind DETECTED!");

  // Create a notification element
  const notification = document.createElement("div");
  notification.innerHTML = "Tailwind CSS detected on this page!";
  notification.style.position = "fixed";
  notification.style.top = "10px";
  notification.style.left = "10px";
  notification.style.right = "10px";
  notification.style.zIndex = "99999999";
  notification.style.padding = "20px";
  notification.style.backgroundColor = "#b81e1e";
  notification.style.color = "white";
  notification.style.borderRadius = "3px";
  notification.style.boxShadow = "0 1px 4px #0000003d";

  notification.innerHTML = `
    <div style="display: flex;flex-wrap: wrap;justify-content: space-between;align-items: center; margin-bottom: 24px;">
      <p>
        <svg style="display: inline; color: white;" fill="white" height="16px" width="16px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 350" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 350 350">
          <g>
            <polygon points="152.674,266.292 179.507,279.708 246.679,145.367 163.023,162.099 214.208,85.32 189.247,68.68    97.886,205.72 192.413,186.814  "/>
            <path d="M350,0H0v350h350V0z M320,320H30V30h290V320z"/>
          </g>
        </svg>
        <strong style="font-weight:800;">HUGE DANGER! Tailwind Detected. 😂</strong>
      </p>
      <a href="https://tailwindcss.com/" style="color: white; text-decoration: underline;">Learn more about the dangers of Tailwind ></a>
    </div>
    <div style="color: #cecece; font-size: 12px; max-width: 600px;">
      <p><strong>Tailwind is CSS.</strong> It is widely praised for being modern and modular - but more importantly, Tailwind is a new, simpler way of looking at CSS.</p>
      <p style="margin-top: 12px;">It is the only CSS framework that effortlessly scales to huge projects, by making onboarding, performance and maintenance overhead issues go away. Further reading:</p>
      <ul style="list-style-type: circle; padding-left: 20px; margin-top: 20px; margin-bottom: 20px;">
        <li><a style="color: white; text-decoration: underline;" href="https://www.youtube.com/watch?v=lHZwlzOUOZ4">Fireship - Tailwind in 100 seconds ></a></li>
        <li><a style="color: white; text-decoration: underline;" href="https://adamwathan.me/css-utility-classes-and-separation-of-concerns/">CSS Utility Classes and "Separation of Concerns" ></a></li>
        <li><a style="color: white; text-decoration: underline;" href="https://www.youtube.com/watch?v=5MKw-wOpJR8">Theo T3 - My Tailwind Journey ></a></li>
        <li><a style="color: white; text-decoration: underline;" href="https://www.youtube.com/watch?v=t-eR4hA7obg">ThePrimeTimeagen - Tailwind Is Ugly Code But.... ></a></li>
      </ul>
    </div>
    <div style="color: #cecece; font-size: 12px; max-width: 600px;">
      <p style="margin-bottom: 12px;">This extension intends to raise awareness of exactly how popular and mature Tailwind has become, as there is a huge amount of developers that don't realise that it is no longer "a beta", "prototyping tool" or "a toy", by showcasing just how much of the modern web prefers Tailwind.</p>
      <p><span id="closePopup" style="cursor: pointer;">[X]</span> This popup will auto-close in <span id="popupTimeout">50</span> seconds.</p>
    </div>
    `;

  // Append the notification to the body
  document.body.appendChild(notification);

  // Auto-close notice
  const popupTimeout = document.getElementById("popupTimeout");
  let remaining = 49;
  setInterval(() => {
    popupTimeout.innerText = remaining.toString();
    remaining--;
  }, 1000);

  // Close button
  var closePopup = document.getElementById("closePopup");
  closePopup.onclick = () => notification.remove();
  closePopup.onmouseout = () => (closePopup.style.textDecoration = "none");
  closePopup.onmouseover = () =>
    (closePopup.style.textDecoration = "underline");

  // Remove the notification after some time
  setTimeout(() => notification.remove(), 50000);
})();
