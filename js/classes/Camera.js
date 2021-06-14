class Camera {
  static padding = 100;

  static renderView(ctx, player) {
    const x = -player.x + player.radius + this.padding;
    const y = -player.y + player.radius + this.padding;

    ctx.translate(x, y);
  }
}

export default Camera;
