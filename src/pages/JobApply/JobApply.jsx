import React from "react";
import { Link, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const JobApply = () => {
  const { id: jobId } = useParams();
  const { user } = useAuth(jobId);

  console.log(jobId, user);

  const handleApplyFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const linkedIn = form.linkedIn.value;
    const github = form.github.value;
    const resume = form.resume.value;
    console.log(linkedIn, github, resume);
    const application = {
      jobId,
      applicant: user.email,
      linkedIn,
      github,
      resume,
    };

    axios
      .post("http://localhost:3000/applications", application)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            title: "Good job!",
            text: "Your application has been submitted!",
            icon: "success",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h3 className="text-4xl">
        Apply for this job: <Link to={`/jobs/${jobId}`}></Link>
      </h3>
      <form onSubmit={handleApplyFormSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 max-w-[300px] mx-auto">
          <label className="label">LinkedIn Link</label>
          <input
            type="url"
            className="input"
            name="linkedIn"
            placeholder="LinkedIn profile link"
          />

          <label className="label">Github Link</label>
          <input
            type="url"
            className="input"
            placeholder="Github Link"
            name="github"
          />

          <label className="label">Resume Link</label>
          <input
            type="url"
            className="input"
            placeholder="Resume Link"
            name="resume"
          />

          <input type="submit" className="btn" value="Apply" />
        </fieldset>
      </form>
    </div>
  );
};

export default JobApply;
