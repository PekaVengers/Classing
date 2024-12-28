import pdfFile from "@/assets/docs/iViz.pdf"; // replace with your actual PDF file path

const Slides = () => {
  return <iframe src={pdfFile} className="w-full h-screen"></iframe>;
};

export default Slides;
