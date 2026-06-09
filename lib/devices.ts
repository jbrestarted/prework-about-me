import type { Device, HardwareRoutingProfile } from "./types";

/**
 * Default device profiles. These are EDITABLE assumptions, not verified
 * hardware specs. The user can change MIDI channels, roles, and routing per
 * project from the Hardware page or Settings.
 */
export const DEFAULT_DEVICES: Device[] = [
  {
    id: "mpc",
    name: "Akai MPC Live III",
    role: "Master clock, main sequencer, arranger, sampler & song-structure hub.",
    midiChannel: "—  (sends clock + per-track MIDI out)",
    clockRole: "master",
    audioRoutingNotes:
      "Main outs to monitors/interface. Record Rytm & A4 audio into MPC tracks for resampling/stems. Consider individual outs for stems.",
    preferredUseCases: [
      "Sample chopping & flipping",
      "Song arrangement / sections",
      "Master tempo & swing",
      "Recording external gear (audio + MIDI)",
      "Performance mutes & automation",
    ],
    userNotes: "",
  },
  {
    id: "rytm",
    name: "Elektron Analog Rytm MKII",
    role: "Drums, percussion, fills, parameter locks & analog drum design.",
    midiChannel: "Ch 9 (default Auto channel) — per-track channels editable",
    clockRole: "receives",
    audioRoutingNotes:
      "Stereo (or individual) outs into MPC inputs or interface. Record drum bus and/or stems for mix prep.",
    preferredUseCases: [
      "Analog kick/snare/clap design",
      "Hi-hat texture & ratchets",
      "Performance fills & p-locks",
      "Percussion layers under samples",
    ],
    userNotes: "",
  },
  {
    id: "a4",
    name: "Elektron Analog Four MKII",
    role: "Bass, chords, leads, pads, textures & analog melodic synthesis.",
    midiChannel: "Ch 1–4 per track (default) — editable",
    clockRole: "receives",
    audioRoutingNotes:
      "Stereo (or individual) outs into MPC inputs or interface. CV outs available for modular if desired.",
    preferredUseCases: [
      "Sub & synth bass with glide",
      "Chord stabs & pads",
      "Lead melodies & motifs",
      "Evolving textures & drones",
    ],
    userNotes: "",
  },
];

export const DEFAULT_ROUTING: HardwareRoutingProfile = {
  masterClockDevice: "mpc",
  sendsMidiClock: true,
  notes: {
    clock:
      "MPC Live III set as master clock; MIDI Clock + Start/Stop sent out. Rytm & A4 set to receive clock/transport (CLOCK RECEIVE + TRANSPORT RECEIVE on the Elektrons).",
    midiOut:
      "MPC MIDI/USB out → Rytm and A4. Assign MPC MIDI tracks to the Elektron channels you choose (e.g. A4 tracks on Ch 1–4, Rytm on Ch 9 or per-track). Verify against your own MIDI config.",
    audio:
      "Rytm + A4 audio outs → MPC inputs (or audio interface). Record performances as audio for resampling and stems. Decide stereo vs. individual outs based on mix needs.",
    arrangementCapture:
      "Build patterns on each device, then capture the song by either: (a) sequencing Elektron pattern changes from MPC program/CC, or (b) recording long audio passes into the MPC and arranging audio clips.",
    patternToSong:
      "Create A/B/C pattern variations on the Elektrons for verse/hook/bridge. Trigger or record them in order to form the full arrangement in the MPC.",
    performanceCapture:
      "Record live mutes, fills, and parameter tweaks as audio (and/or automation) into the MPC so spontaneous moments are kept.",
  },
};

export function cloneDefaultDevices(): Device[] {
  return DEFAULT_DEVICES.map((d) => ({ ...d, preferredUseCases: [...d.preferredUseCases] }));
}

export function cloneDefaultRouting(): HardwareRoutingProfile {
  return { ...DEFAULT_ROUTING, notes: { ...DEFAULT_ROUTING.notes } };
}
