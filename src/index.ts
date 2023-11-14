import type { Plugin } from "betterdiscord";

export default class UnreadVoiceText implements Plugin {
  start() {
    const ChannelItem = BdApi.Webpack.getByKeys("ChannelItemIcon");
    const DiscordConstants = BdApi.Webpack.getByKeys(
      "Permissions",
      "ActivityTypes",
      "StatusTypes",
    );
    const MutedStore = BdApi.Webpack.getByKeys("isMuted", "isChannelMuted");
    const UnreadClasses = BdApi.Webpack.getByKeys("unread", "unreadRelevant");
    const UnreadStateStore = BdApi.Webpack.getByKeys(
      "getMentionCount",
      "hasUnread",
    );

    BdApi.Patcher.after(
      "unreadVoiceText",
      ChannelItem,
      "default",
      (_, args, returnValue) => {
        const props = args[0] as any; //eslint-disable-line @typescript-eslint/no-explicit-any
        if (props.selected) return;

        if (props.channel.type !== DiscordConstants.ChannelTypes.GUILD_VOICE)
          return;

        const muted = MutedStore.getMutedChannels(props.channel.guild_id).has(
          props.channel.id,
        );
        if (muted) return;

        const unread = UnreadStateStore.hasUnread(props.channel.id);
        if (!unread) return;

        const unreadIndicator = BdApi.React.createElement("div", {
          className: [UnreadClasses.unread, UnreadClasses.unreadRelevant].join(
            " ",
          ),
          style: props.connected ? { top: "33%" } : {},
        });

        returnValue.props.children.props.children.unshift(unreadIndicator);
        returnValue.props.children.props.className = [
          returnValue.props.children.props.className,
          UnreadClasses.modeUnreadNormal,
        ].join(" ");
      },
    );
  }

  stop() {
    BdApi.Patcher.unpatchAll("unreadVoiceText");
  }
}
