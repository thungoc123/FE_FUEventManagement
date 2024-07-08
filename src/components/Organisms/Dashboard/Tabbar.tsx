import { Button, Tabs, TabsContent, TabsList, TabsTrigger  } from '@relume_io/relume-ui';
import { AddCheckStaffTable } from '../EventOperator/checkingStaff';
import { AddSponsorTable } from '../EventOperator/sponsor';
import { EventScheduleTable } from '../EventOperator/eventSchedule';
import { Gallery5 } from '../EventOperator/image';
import React from 'react';
import { EOevent } from '../../../Types/eo.type';
import { useSelector } from 'react-redux';
<<<<<<< HEAD
=======
import { selectUnpublishEvents } from '../../../Features/EventManage/eventSelector';
>>>>>>> TienMerge
import { RootState } from '../../../Store/Store';

type Props = {
  id: number
<<<<<<< HEAD
  defaultDisplay: string
=======
>>>>>>> TienMerge
}

const Tabbar:React.FC<Props> = (prop) => {
  // const Events = useSelector(selectUnpublishEvents);
  const Events = useSelector((state: RootState) => state.events.events);
<<<<<<< HEAD
  console.log(Events)
  console.log('prop.id:', prop.id);
  // console.l
=======

  console.log(Events)
  console.log('prop.id:', prop.id);
>>>>>>> TienMerge

  // const eventDetail= Events?.find(event => event.id === prop.id);
  const eventDetail = Events?.find(event => event.id === parseInt(prop.id));

  // console.log(eventDetail)
    return (
<<<<<<< HEAD
      <Tabs defaultValue={prop.defaultDisplay}>
=======
        <Tabs defaultValue="schedule">
>>>>>>> TienMerge
        <TabsList>
          <TabsTrigger value="img" className='border-t-0 border-r-0 border-b border-l-0 m-[2px]'>Image
          </TabsTrigger>
          <TabsTrigger value="checking" className='border-t-0 border-r-0 border-b border-l-0 m-[2px]'>Checking Staff</TabsTrigger>
          <TabsTrigger value="sponsor" className='border-t-0 border-r-0 border-b border-l-0 m-[2px]'>Sponsor</TabsTrigger>
          <TabsTrigger value="schedule" className='border-t-0 border-r-0 border-b border-l-0 m-[2px]'>Event Schedule</TabsTrigger>
          {/* <TabsTrigger value="feeback">Feedback</TabsTrigger> */}

        </TabsList>
        <TabsContent className="mt-2" value="img">
          <Gallery5 images={eventDetail?.eventImages}/>
        </TabsContent>
        <TabsContent className="mt-2" value="checking">
          <AddCheckStaffTable Staff={eventDetail?.eventCheckingStaffs}/>
        </TabsContent>
        <TabsContent className="mt-2" value="sponsor">
          <AddSponsorTable />
        </TabsContent><TabsContent className="mt-2" value="schedule">
          <EventScheduleTable eventSchedule={eventDetail?.eventSchedules}/>
        </TabsContent>
      </Tabs>
    );
  }
  
  export default Tabbar;
  