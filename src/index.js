// import React from 'react';
// import PropTypes from 'prop-types';
// import { render } from 'react-dom';
// import {
//   SectionHeading,
//   TextInput,
//   FieldGroup,
//   RadioButtonField,
//   // Form,
//   // Asset,
//   // DropdownList
// } from '@contentful/forma-36-react-components';
// import { init, /*locations*/ } from 'contentful-ui-extensions-sdk';
// import '@contentful/forma-36-react-components/dist/styles.css';
// import '@contentful/forma-36-fcss/dist/styles.css';
// import './index.css';

// /**
//  * To use this demo create a Content Type with the following fields:
//  *  title: Short text
//  *  body: Long text
//  *  hasReport: Boolean
//  *  report: Long text
//  *
//  *  See https://github.com/contentful/create-contentful-extension/blob/master/docs/examples/entry-editor-content-model.json for details.
//  */

// export class App extends React.Component {
//   static propTypes = {
//     sdk: PropTypes.object.isRequired
//   };
//   detachExternalChangeHandler = null;
//   constructor(props) {
//     super(props);

//     this.state = {
//       hasReport: props.sdk.entry.fields.hasReport.getValue() || false,
//       selectedValue: props.sdk.entry.fields.selectedValue.getValue(),
//       // reportPdf: props.sdk.entry.fields.reportPdf.getValue(),
//     };
//   }
//   componentDidMount() {
//     this.props.sdk.window.startAutoResizer();
//     // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
//     this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(this.onExternalChange);
//   };
    
//   componentWillUnmount() {
//     if (this.detachExternalChangeHandler) {
//       this.detachExternalChangeHandler();
//     }
//   };

//   onHasReportChangeHandler = event => {
//     const hasReport = event.target.value === 'yes';
//     this.setState({ hasReport });
//     this.props.sdk.entry.fields.hasReport.setValue(hasReport);
//   };

//   onselectedValueChangeHandler = event => {
//     const value = event.target.value;
//     this.setState({ selectedValue: value });
//     this.props.sdk.entry.fields.selectedValue.setValue(value);
//   };

//   // onReportPdfChangeHandler = event => {
//   //   const value = event.target.value;
//   //   this.setState({ reportPdf: value });
//   //   this.props.sdk.entry.fields.reportPdf.setValue(value);
//   // };



//   render() {
//     const { hasReport, selectedValue, /*reportPdf*/ } = this.state;
//     return (
//       // <Form className="f36-margin--l">
//       <>
//         <SectionHeading>Is Report?</SectionHeading>
//         <FieldGroup row={false}>
//           <RadioButtonField
//             labelText="Yes"
//             checked={hasReport === true}
//             value="yes"
//             onChange={this.onHasReportChangeHandler}
//             name="reportOption"
//             id="yesCheckbox"
//           />
//           <RadioButtonField
//             labelText="No"
//             checked={hasReport === false}
//             value="no"
//             onChange={this.onHasReportChangeHandler}
//             name="reportOption"
//             id="noCheckbox"
//           />
//         </FieldGroup>
//         {hasReport && (
//           <>
//             <SectionHeading>report</SectionHeading>
//             <TextInput
//               testId="field-report"
//               onChange={this.onselectedValueChangeHandler}
//               value={selectedValue}
//             />
//             {/* <Asset /> */}
//           </>
//         )}          </>
//       // </Form>
//     );
//   }
// }

// // init(sdk => {
// //   if (sdk.location.is(locations.LOCATION_ENTRY_EDITOR)) {
// //     render(<App sdk={sdk} />, document.getElementById('root'));
// //   }
// // });

// /**
//  * By default, iframe of the extension is fully reloaded on every save of a source file.
//  * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
//  */
// // if (module.hot) {
// //   module.hot.accept();
// // }

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { 
  SectionHeading,
  FieldGroup,
  RadioButton,
  // Form,
  // Asset,
  // DropdownList
 } from '@contentful/forma-36-react-components';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

export class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  detachExternalChangeHandler = null;

  constructor(props) {
    super(props);
    this.state = {
      // value: props.sdk.field.getValue() || '',
      hasReport: false,
      selectedValue: props.sdk.field.getValue() || '',
      // reportPdf: props.sdk.entry.fields.reportPdf.getValue(),
    };
  }

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();

    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(this.onExternalChange);
  }

  componentWillUnmount() {
    if (this.detachExternalChangeHandler) {
      this.detachExternalChangeHandler();
    }
  }

  onHasReportChangeHandler = () => {
    const { hasReport } = this.state;
    this.setState({ hasReport: !hasReport });
  };

  // onselectedValueChangeHandler = event => {
  //   const value = event.currentTarget.value;
  //   this.setState({ selectedValue: value });
  //   this.props.sdk.field.selectedValue.setValue(value);
  // };

  onExternalChange = value => {
    this.setState({ selectedValue: value });
  };

  onSelectedValueChangeHandler = event => {
    const value = event.currentTarget.value;
    console.log("App -> value ", value)
    this.setState({ selectedValue: value });
    if (value) {
      this.props.sdk.field.setValue(value);
    } else {
      this.props.sdk.field.removeValue();
    }
  };

  render() {
    const { hasReport, selectedValue, /*reportPdf*/ } = this.state;
    console.log("App -> render -> selectedValue", selectedValue)
    
    console.log("TCL: App -> render -> this.props.sdk.entry", this.props.sdk.entry.fields)
    return (
      <Fragment>
        <FieldGroup row={true}>
        <RadioButton
          labelText="Yes"
          checked={hasReport === true}
          value="yes"
          onChange={this.onHasReportChangeHandler}
          name="reportOption"
          id="yesCheckbox"
        />
        <RadioButton
          labelText="No"
          checked={hasReport === false}
          value="no"
          onChange={this.onHasReportChangeHandler}
          name="reportOption"
          id="noCheckbox"
        />
        </FieldGroup>
        {hasReport && (
          <Fragment>
            <SectionHeading>Report Type</SectionHeading>
            <select
              data-test-id="dropdown-editor"
              className="Select__Select___31Z46 a11y__focus-border--default___60AXp"
              onBlur={this.onSelectedValueChangeHandler}
              onChange={this.onSelectedValueChangeHandler}
            >
              <option value="" selected disabled data-test-id="cf-ui-select-option">Choose a value</option>
              <option value="All reports" data-test-id="cf-ui-select-option">All reports</option>
              <option value="Annual" data-test-id="cf-ui-select-option">Annual</option>
              <option value="Financial" data-test-id="cf-ui-select-option">Financial</option>
              <option value="Interim" data-test-id="cf-ui-select-option">Interim</option>
              <option value="Research" data-test-id="cf-ui-select-option">Research</option>
            </select>
          </Fragment>
          )}
      </Fragment>
    );
  }
}

init(sdk => {
  render(<App sdk={sdk} />, document.getElementById('root'));
});

// /**
//  * By default, iframe of the extension is fully reloaded on every save of a source file.
//  * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
//  */
// // if (module.hot) {
// //   module.hot.accept();
// // }
