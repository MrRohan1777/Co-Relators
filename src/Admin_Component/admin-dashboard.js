import React, { useState, useEffect } from "react";
import axios from "axios";
import '../AdminStyle/adminDash.css'; 
import { useNavigate,useParams,useLocation } from 'react-router-dom';

const AdminDashboard = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
 const navigate = useNavigate();

  const location = useLocation();
    const temp = location.state?.temp; 
useEffect(() => {
      if (!temp && temp!='Y') {
          navigate('/adminIndex', { replace: true });
      } 
  }, [navigate]);

  useEffect(() => {
    fetchEmails();
  }, [page]);

  const fetchEmails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/getAllMails`);
      setEmails(response.data);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Email Dashboard</h1>
      {loading ? (
        <p>Loading emails...</p>
      ) : (
        <table className="email-table">
          <thead>
            <tr>
              <th>Sender</th>
              <th>Subject</th>
              {/* <th>Content</th> */}
              <th>Received Date</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email) => (
              <tr key={email.id}>
                <td>{email.sender}</td>
                <td>{email.subject}</td>
                {/* <td>
                  {email.content}
                </td> */}
                <td>{new Date(email.receivedDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))}>Previous</button>
      <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
    </div>
  );
};

export default AdminDashboard;
