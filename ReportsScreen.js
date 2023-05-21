import React from 'react';
import { Button, TextInput, Text, View } from 'react-native';

import * as Database from './Database';

class ReportsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      addingReport: false,
      newReportName: '',
    };
    Database.ensureExists();
    Database.getReports().then((reports) => {
      this.setState({reports});
    });
  }
  render() {
    return (
      <View>
        <Button
          title="New Report"
          onPress={() => {
            this.setState({addingReport: true});
          }}
        />
        {
          this.state.addingReport ?
            <View>
              <Text>Name:</Text>
              <TextInput
                value={this.state.newReportName}
                onChangeText={(text) => this.setState({newReportName: text})}
                maxLength={200}
                style={{borderWidth: 1, borderColor: 'black'}}
              />
              <Button
                title="Add"
                onPress={async () => {
                  stuff = await Database.addReport(this.state.newReportName);
                  console.log(stuff);
                  // Prepend new report to existing report list
                  this.setState({
                    reports: [stuff, ...this.state.reports],
                    addingReport: false,
                    newReportName: '',
                  });
                }}
              />
            </View>
          : null
        }
        {
          (this.state.reports || []).map((report) => {
            return (
              <View key={report.id}>
                <Button
                    title={report.name}
                    color='#ccc'
                />
              </View>
            );
          })
        }
      </View>
    );
  }
}
export default ReportsTab;
