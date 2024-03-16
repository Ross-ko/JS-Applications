export function showView(sectionID, callback, event, param) {
    event?.preventDefault();
    document
      .querySelectorAll("section")
      .forEach((s) => (s.style.display = "none"));
    document.getElementById(sectionID).style.display = "block";
  
    if (typeof callback == "function") {
      callback(param);
    }
  }