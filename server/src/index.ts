import DotEnv from 'dotenv';
import Path from 'path';
import Express from 'express';
import * as Ably from 'ably';

// Load the ENVs
DotEnv.config({
  path: Path.resolve(process.cwd(), '../', '.env'),
});

const ABLY_FEED = 'slante';

// Convifgure Ably
let options: Ably.Types.ClientOptions = { key: process.env.ABLY_KEY };
// let client = new Ably.Realtime(options); /* inferred type Ably.Realtime */
// let channel = client.channels.get('feed'); /* inferred type Ably.Types.RealtimeChannel */

// channel.presence.history()

let client = new Ably.Rest(options);
let channel = client.channels.get(ABLY_FEED);
channel.presence.get(function (err, presenceSet) {
    console.log(presenceSet); // array of PresenceMessages
});