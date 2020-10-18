import { render } from 'react-dom';
import './index.css';
import * as React from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';

import { extend } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from './sample-base';
import { PropertyPane } from './property-pane';
import * as dataSource from './datasource.json';
/**
 * Schedule views sample
 */
export class Views extends SampleBase {
    constructor() {
        super(...arguments);
        this.data = extend([], dataSource.zooEventsData, null, true);
        this.viewOptions = [
            { text: 'Dia', value: 'Day' },
            { text: 'Semana', value: 'Week' },
            { text: 'Semana Útil', value: 'WorkWeek' },
            { text: 'Mês', value: 'Month' }
        ];
        this.fields = { text: 'text', value: 'value' };
    }
    onViewChange(args) {
        this.scheduleObj.currentView = args.value;
        this.scheduleObj.dataBind();
    }
    onEventRendered(args) {
        applyCategoryColor(args, this.scheduleObj.currentView);
    }
    render() {
        return (<div className='schedule-control-section'>
        <div className='col-lg-9 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent width='100%' height='650px' ref={schedule => this.scheduleObj = schedule} selectedDate={new Date(2018, 1, 15)} eventSettings={{ dataSource: this.data }} eventRendered={this.onEventRendered.bind(this)}>
              <ViewsDirective>
                <ViewDirective option='Day'/>
                <ViewDirective option='Week'/>
                <ViewDirective option='WorkWeek'/>
                <ViewDirective option='Month'/>
              </ViewsDirective>
              <Inject services={[Day, Week, WorkWeek, Month, Resize, DragAndDrop]}/>
            </ScheduleComponent>
          </div>
        </div>
      </div>);
    }
}

render(<Views />, document.getElementById('sample'));