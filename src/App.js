import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onclick }) {
  return (
    <button className="button" onClick={onclick}>
      {children}
    </button>
  );
}

export default function App() {
  const [showAddFriendForm, setShowAddFriendForm] = useState(false);
  const [friends, setFriends] = useState(initialFriends);

  function handleAddFriend(friend) {
    setFriends((prevFriends) => [...prevFriends, friend]);
    setShowAddFriendForm(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showAddFriendForm && (
          <FormAddFriend
            onhandleAddFriend={handleAddFriend}
            // onShowAddFriendForm={setShowAddFriendForm}
          />
        )}
        <Button
          onclick={() => {
            setShowAddFriendForm((show) => !show);
          }}
        >
          {!showAddFriendForm ? "Add friend" : "close"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button>select</Button>
    </li>
  );
}

function FormAddFriend({ onhandleAddFriend, onShowAddFriendForm }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleOnSubmit(evt) {
    evt.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onhandleAddFriend(newFriend);
    // onShowAddFriendForm(false);
    console.log(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleOnSubmit}>
      <label>👯‍♀️Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
      <label>👤Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(evt) => setImage(evt.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>🧾 Split a bill with X</h2>
      <label>💰Bill Value</label>
      <input type="text" />
      <label>💵Your Expense</label>
      <input type="text" />
      <label>💵X's expense</label>
      <input type="text" disabled />
      <label>🛜Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
    </form>
  );
}
