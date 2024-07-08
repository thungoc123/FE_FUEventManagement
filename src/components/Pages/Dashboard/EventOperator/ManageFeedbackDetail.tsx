import React from 'react'
import { ApplicationShell4 } from '../../../Organisms/Dashboard/ApplicationShell'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@relume_io/relume-ui'
import { QuestionManage } from '../../../Organisms/Dashboard/Question'
import { AnswerManage } from '../../../Organisms/Dashboard/Answer'
<<<<<<< HEAD
import { useParams } from 'react-router-dom'
import { useGetListFeedbackQuestionQuery } from '../../../../Features/FeedbackManage/feedbackApi'

export const ManageFeedbackDetail = () => {
  const { id } = useParams();
  const { data: feedbackQuestions, refetch  } = useGetListFeedbackQuestionQuery(id);

  return (

=======

export const ManageFeedbackDetail = () => {
  return (
>>>>>>> TienMerge
    <div>

        <ApplicationShell4 
            MainComponent = {
                <Tabs defaultValue="Question">
        <TabsList>
          <TabsTrigger value="Question" className='border-t-0 border-r-0 border-b border-l-0 m-[2px]'>Question
          </TabsTrigger>
         
<<<<<<< HEAD
          {/* <TabsTrigger value="Answer" className='border-t-0 border-r-0 border-b border-l-0 m-[2px]'>Answer
          </TabsTrigger> */}
=======
          <TabsTrigger value="Answer" className='border-t-0 border-r-0 border-b border-l-0 m-[2px]'>Answer
          </TabsTrigger>
>>>>>>> TienMerge
        </TabsList>
       
        <TabsContent className="mt-2" value="Question">
         <QuestionManage />
        </TabsContent>
<<<<<<< HEAD
        {/* <TabsContent className="mt-2" value="Answer">
         <AnswerManage />
        </TabsContent> */}
=======
        <TabsContent className="mt-2" value="Answer">
         <AnswerManage />
        </TabsContent>
>>>>>>> TienMerge
      </Tabs>
        
            }
        
        />
    </div>
  )
}
