import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import Firebase from './utils/Firebase';

class Conversation extends React.Component {
  state = {
    messages: [],
  };

  get user() {
    return {
      name: this.props.route.params.name,
      _id: Firebase.shared.uid,
    };
  }

  componentDidMount() {
    Firebase.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    Firebase.shared.off();
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Firebase.shared.send}
        user={this.user}
      />
    );
  }
}

export default Conversation;
