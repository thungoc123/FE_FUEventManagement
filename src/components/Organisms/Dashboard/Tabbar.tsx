import { Button, Tabs, TabsContent, TabsList, TabsTrigger  } from '@relume_io/relume-ui';
import { AddCheckStaffTable } from '../EventOperator/checkingStaff';
import { AddSponsorTable } from '../EventOperator/sponsor';
import { EventScheduleTable } from '../EventOperator/eventSchedule';
import { Gallery5 } from '../EventOperator/image';
function Tabbar() {
    return (
        <Tabs defaultValue="schedule">
        <TabsList>
          <TabsTrigger value="img" className='border-t-0 border-r-0 border-b border-l-0 m-[2px]'>Image
          </TabsTrigger>
          <TabsTrigger value="checking" className='border-t-0 border-r-0 border-b border-l-0 m-[2px]'>Checking Staff</TabsTrigger>
          <TabsTrigger value="sponsor" className='border-t-0 border-r-0 border-b border-l-0 m-[2px]'>Sponsor</TabsTrigger>
          <TabsTrigger value="schedule" className='border-t-0 border-r-0 border-b border-l-0 m-[2px]'>Event Schedule</TabsTrigger>
          {/* <TabsTrigger value="feeback">Feedback</TabsTrigger> */}

        </TabsList>
        <TabsContent className="mt-2" value="img">
          <Gallery5 />
        </TabsContent>
        <TabsContent className="mt-2" value="checking">
          <AddCheckStaffTable />
        </TabsContent>
        <TabsContent className="mt-2" value="sponsor">
          <AddSponsorTable />
        </TabsContent><TabsContent className="mt-2" value="schedule">
          <EventScheduleTable />
        </TabsContent>
      </Tabs>
    );
  }
  
  export default Tabbar;
  