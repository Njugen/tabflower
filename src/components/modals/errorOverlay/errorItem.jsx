import React, { Component } from "react";

export default class ErrorItem extends Component {
  render() {
    const { title, message, code } = this.props;

    return (
      <div className="row error-list d-flex justify-content-center pt-3 pb-3">
        <div className="col-10">
          <ul className="mt-3">
            <li>
              <span className="font-weight-bold">Error Type/Error Name:</span>
              <p>{typeof title === "string" ? title : "Unknown Error"}</p>
            </li>
            <li>
              <span className="font-weight-bold">Message:</span>
              <p>
                {typeof message === "string"
                  ? message
                  : "Information related to this error could not be retrieved."}
              </p>
            </li>
            <li>
              <span className="font-weight-bold">Code:</span>
              <p>{typeof code === "string" ? code : "unknown"}</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
