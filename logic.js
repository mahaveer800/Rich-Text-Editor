// Main formatting function
const formatDoc = (cmd, value = null) => {
  content.focus();
  document.execCommand(cmd, false, value);
};

// Prevent toolbar buttons from stealing focus
document.querySelectorAll(".btn-toolbar button").forEach(btn => {
  btn.addEventListener("mousedown", e => e.preventDefault());
});

// Add link
const handleAddLink = () => {
  let url = prompt("Enter the URL");
  if (url && !url.startsWith("http")) {
    url = "https://" + url + ".com";
  }
  formatDoc("createLink", url);
};

// File handling (basic demo)
const handleFile = (type) => {
  const fileName = document.getElementById("fileName").value || "untitled";
  const text = content.innerText;

  if (type === "new") {
    content.innerHTML = "";
  } else if (type === "txt") {
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName + ".txt";
    link.click();
  } else if (type === "pdf") {
    // Simple PDF export using window.print (for demo)
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write("<pre>" + text + "</pre>");
    printWindow.document.close();
    printWindow.print();
  }
};

const content = document.getElementById("content");

content.addEventListener("mouseenter",()=>{
  let anchors = content.querySelectorAll("a");

  // console.log(anchors)

  anchors.forEach((anchor)=>{
    anchor.addEventListener("click",(e)=>{
    anchor.setAttribute("target","blank");
    content.setAttribute("contentEditable","false");
    })
  })
})
