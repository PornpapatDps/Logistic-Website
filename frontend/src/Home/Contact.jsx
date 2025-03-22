import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Contact = () => {
  return (
    <div style={styles.contactContainer}>
      <div style={styles.contactContent}>
        {/* Left section */}
        <div style={styles.leftSection}>
          <h2 style={styles.header}>BBrownie Logistics</h2>
          <p style={styles.subHeader}>© 2024 BBrownie Logistics. All Rights Reserved.</p>
        </div>

        {/* Right section */}
        <div style={styles.rightSection}>
          <h3 style={styles.contactTitle}>Contact Us</h3>
          <div style={styles.contactInfo}>
            <p style={styles.infoText}>Contact: <span style={styles.highlight}>+234 123 456 7890</span></p>
            <p style={styles.infoText}>
              Email: <a href="mailto:BBrownieLogistics@gmail.com" style={styles.email}>BBrownieLogistics@gmail.com</a>
            </p>
            <p style={styles.infoText}>Address: 123 Fake Street, Lagos, Nigeria</p>
          </div>

          <div style={styles.socialIcons}>
            <a href="#" style={styles.icon}>
              <FaFacebook size={30} />
            </a>
            <a href="#" style={styles.icon}>
              <FaTwitter size={30} />
            </a>
            <a href="#" style={styles.icon}>
              <FaInstagram size={30} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  contactContainer: {
    backgroundColor: "white",  // เปลี่ยนพื้นหลังเป็นสีขาว
    color: "#333",  // ใช้สีเข้มสำหรับข้อความ
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  contactContent: {
    display: "flex",
    justifyContent: "space-between",
    width: "80%",
    maxWidth: "1200px",
  },
  leftSection: {
    flex: 1,
    paddingRight: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  rightSection: {
    flex: 1,
    paddingLeft: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "left",
  },
  header: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#002c77",  // เพิ่มสีเข้มให้กับชื่อบริษัท
  },
  subHeader: {
    fontSize: "18px",
    marginTop: "10px",
  },
  contactTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#002c77",  // ใช้สีเดียวกับชื่อบริษัท
  },
  contactInfo: {
    marginBottom: "20px",
  },
  infoText: {
    fontSize: "16px",
    margin: "5px 0",
  },
  highlight: {
    color: "#002c77",
  },
  email: {
    color: "#002c77",
    textDecoration: "none",
  },
  socialIcons: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "20px",
  },
  icon: {
    marginRight: "15px",
    color: "#002c77",  // เปลี่ยนสีของไอคอนเป็นสีน้ำเงินเข้ม
    textDecoration: "none",
    transition: "color 0.3s",
  },
};

export default Contact;
