import React, { Component } from "react";
import * as validator from "../../utils/inputValidators";

export default class FooterWrapper extends Component {
  render() {
    const { Contents, data } = this.props;
    const { isFunction } = validator;

    return (
      <div className="modal-footer">
        {isFunction(Contents) && Contents(data)}
      </div>
    );
  }
}

/* 
 
 <div className="modal-footer">
        {typeof this.dismissModalHandler === "function" && (
          <button
            type="button"
            id="modal-dismiss"
            className="btn btn-secondary"
            onClick={() => this.dismissModalHandler()}
          >
            Close
          </button>
        )}
        {typeof this.saveModalHandler === "function" && (
          <button
            type="button"
            id="modal-save"
            className="btn btn-tabeon"
            onClick={() =>
              this.saveModalHandler((data) => {
                this.executePropsAction(data);
              })
            }
          >
            Save changes
          </button>
        )}
      </div>

 */
