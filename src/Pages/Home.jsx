import React, { useRef, useEffect ,useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth , db} from '../config/Firebase/Firebase';
import { Navigate , useNavigate} from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { orderBy, Timestamp  } from 'firebase/firestore';
import { collection, addDoc , getDocs, query, where ,doc ,  deleteDoc, updateDoc, } from "firebase/firestore";

const Home = () => {


 const [user] = useAuthState(auth); 
const navigate = useNavigate(); 

const [todo , setTodo] = useState([])
const todoInput = useRef()
const [isEditing, setIsEditing] = useState(false);
const [currentTodoId, setCurrentTodoId] = useState(null); 

//useEffect

useEffect(() => {
  const getDataFromFirestore = async () => {
    const q = query(collection(db, "todo"),
     where("uid", "==", auth.currentUser.uid) ,  
      orderBy("timestamp", "desc"));


    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
      console.log(doc.data());
      todo.push({
        ...doc.data(),
        docid: doc.id,
        timestamp: doc.data().timestamp.toDate().toLocaleString()
      })
      setTodo([...todo])
      
    });
  }


  getDataFromFirestore()
}, [])



// const addTodo = async (event) => {
//   event.preventDefault()
//   console.log(todoInput.current.value)
  
// // todoInput.current.value=''

// try {
//   const docRef = await addDoc(collection(db, "todo"), {
//     title: todoInput.current.value,
//     uid: auth.currentUser.uid
    
//   });
//   console.log("Document written with ID: ", docRef.id);
//   todo.push({
//     title: todoInput.current.value,
//     uid: auth.currentUser.uid,
//     docid: docRef.id
    
//   })
//   setTodo([...todo])
//   todoInput.current.value=''

// } catch (e) {
//   console.error("Error adding document: ", e);
// }
  
// }

//AddTodo
const addTodo = async (event) => {
  event.preventDefault();
  const inputValue = todoInput.current.value;

  if (inputValue === "") return;

  try {
    if (isEditing) {
 
      const todoDoc = doc(db, "todo", currentTodoId);
      await updateDoc(todoDoc, { title: inputValue });
      

      setTodo((prevTodos) =>
        prevTodos.map((item) =>
          item.docid === currentTodoId ? { ...item, title: inputValue } : item
        )
      );

      setIsEditing(false);
      setCurrentTodoId(null);
    } else {
     
      const docRef = await addDoc(collection(db, "todo"), {
        title: inputValue,
        uid: auth.currentUser.uid,
        timestamp: Timestamp.now()
      });

      setTodo([...todo, { title: inputValue, uid: auth.currentUser.uid, docid: docRef.id, timestamp: new Date().toLocaleString() }]);
    }

    todoInput.current.value = '';
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const deleteTodo = async (docid) => {
  try {
    await deleteDoc(doc(db, "todo", docid));
    setTodo(todo.filter(item => item.docid !== docid));
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

const startEditTodo = (item) => {
  setIsEditing(true);
  setCurrentTodoId(item.docid);
  todoInput.current.value = item.title;
};






//userlogout


  const logoutUser = async () => {
    await signOut(auth);
    navigate('/login'); 
  };

  if (!user) {
    return <Navigate to="/login" />;   
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-2xl font-bold mb-6">Enter Your Todo</h1>
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <form onSubmit={addTodo} className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Enter Todo"
          ref={todoInput}
          className="border border-gray-300 rounded-lg p-2 flex-1 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-red-400 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200"
        >
          {isEditing ? 'Update Todo' : 'Add Todo'}
        </button>
      </form>

      <ol className="mt-6 space-y-4">
        {todo.length > 0 ? (
          todo.map((item) => (
            <li key={item.docid} className="flex items-center justify-between">
            <span className="text-gray-800">{item.title}</span>
       <div className="text-gray-500 text-sm">
            {item.timestamp}
       </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => startEditTodo(item)}
                  className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded-lg transition-all duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(item.docid)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-lg transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center">No Data Found...</p>
        )}
      </ol>
    </div>
    <button
      onClick={logoutUser}
      className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200"
    >
      Logout
    </button>
  </div>
);

}

export default Home