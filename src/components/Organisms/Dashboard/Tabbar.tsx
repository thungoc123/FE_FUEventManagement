import { Tabs, TabsContent, TabsList, TabsTrigger  } from '@relume_io/relume-ui';
function Tabbar() {
    return (
        <Tabs defaultValue="tab">
        <TabsList>
          <TabsTrigger value="img">Image</TabsTrigger>
          <TabsTrigger value="checking">Checking Staff</TabsTrigger>
          <TabsTrigger value="sponsor">Sponsor</TabsTrigger>
          <TabsTrigger value="schedule">Event Schedule</TabsTrigger>
          <TabsTrigger value="feeback">Feedback</TabsTrigger>

        </TabsList>
        <TabsContent className="mt-2" value="img">
          Manage your monthly subscriptions
        </TabsContent>
        <TabsContent className="mt-2" value="checking">
          Manage your yearly subscriptions
        </TabsContent>
        <TabsContent className="mt-2" value="sponsor">
          Manage your yearly subscriptions
        </TabsContent><TabsContent className="mt-2" value="schedule">
          Manage your yearly subscriptions
        </TabsContent>
      </Tabs>
    );
  }
  
  export default Tabbar;
  