import React from 'react'
import { ApplicationShell4 } from '../../../Organisms/Dashboard/ApplicationShell'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@relume_io/relume-ui'
import { QuestionManage } from '../../../Organisms/Dashboard/Question'
import { AnswerManage } from '../../../Organisms/Dashboard/Answer'
import { useParams } from 'react-router-dom'
import { useGetListFeedbackQuestionQuery } from '../../../../Features/FeedbackManage/feedbackApi'
import { useGetSurveyQuestionsQuery } from '../../../../Features/Survey/survey'

export const ManageSurveyDetail = () => {
  const { id } = useParams();
  const { data: feedbackQuestions, refetch  } = useGetSurveyQuestionsQuery(id);

  return (

    <div>

        <ApplicationShell4 
            MainComponent = {
                <Tabs defaultValue="Question">
        <TabsList>
          <TabsTrigger value="Question" className='border-t-0 border-r-0 border-b border-l-0 m-[2px]'>Question
          </TabsTrigger>
        </TabsList>
       
        <TabsContent className="mt-2" value="Question">
         <QuestionManage />
        </TabsContent>

      </Tabs>
        
            }
        
        />
    </div>
  )
}
