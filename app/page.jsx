import { Suspense } from 'react';
import Form from './addTodoForm';
import Todos from './todos';
import Loading from './loading';

const Page = () => {
  return (
    <div className="container">
      <Form />

      <Suspense fallback={<Loading/>}>
        <Todos />
      </Suspense>

    </div>
  )
}

export default Page;