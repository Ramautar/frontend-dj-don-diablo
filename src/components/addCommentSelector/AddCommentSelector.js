import React, {useState} from 'react';
import { ReactComponent as Spinner } from '../../assets/refresh.svg';
import './AddCommentSelector.css'
import axios from "axios";

const comments = [
    "Copyright violation",
    "Song marked as favourite",
    "Song marked as accepted",
    "Song marked as rejected"
]

function AddCommentSelector({demoId}) {
    const [selectedComment, setSelectedComment] = useState('');
    const [comment, setComment] = useState(null)
    const [loading, toggleLoading] = useState(false)
    const [succesMessage, setSuccesMessage] = useState(false);
    const [failedMessage, setFailedMessage] = useState(false);

    async function uploadComment() {
        setComment(comments[selectedComment])
        if (selectedComment) {
            setFailedMessage(false);
            toggleLoading(true);
            try {
                const response = await axios.patch(`http://localhost:8080/api/demos/${demoId}`, comments[selectedComment], {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setSuccesMessage(true)
                setTimeout(() => {
                    setSuccesMessage(false)
                }, 2000)
            } catch (e) {
                setFailedMessage(true);
            }
            toggleLoading(false);
        }
    }

    return (
        <div className='add-comment-selector'>
            <p className='comment-upload-msg'>
                {succesMessage && <p className="successful-upload"> Commentaar succesvol toegevoegd</p>}
                {failedMessage && <p className="failed-upload">Fout tijdens verzenden</p>}
            </p>
            <select
                className='comment-selection-box'
                name='selectedComments'
                value={selectedComment}
                onChange={(event) => setSelectedComment(event.target.value)}
            >
                <option defaultValue=''/>
                <option value={0}>{comments[0]}</option>
                <option value={1}>{comments[1]}</option>
                <option value={2}>{comments[2]}</option>
                <option value={3}>{comments[3]}</option>
                <option/>
            </select>
            <button
                className='add-comment-button'
                type='button'
                onClick={uploadComment}
                disabled={loading}
            >{loading ? <Spinner className="loading-icon" /> : 'Add Comment'}
            </button>
        </div>
    )
}
export default AddCommentSelector;
