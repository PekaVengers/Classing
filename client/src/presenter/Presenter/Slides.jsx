import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import "@react-pdf-viewer/core/lib/styles/index.css";

// Create styles using react-pdf's StyleSheet
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const MyDocument = (link) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Slide #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Slide #2</Text>
      </View>
    </Page>
  </Document>
);

const Slides = () => (
  <div className="w-full h-lvh flex items-center justify-center bg-gray-100">
    {/* PDFViewer with Tailwind for full width and height */}
    <PDFViewer className="w-full h-full">
      <MyDocument />
    </PDFViewer>
  </div>
);

export default Slides;
