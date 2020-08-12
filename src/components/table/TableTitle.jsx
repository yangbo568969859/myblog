export default {
  name: 'TableTitle',
  functional: true,
  props: {
    title: {
      required: true,
      type: String
    },
    subTitle: {
      type: String
    }
  },
  render(h, context) {
    const { props } = context;
    return <div class="list-wrapper">
      <div class="up-tips tips-data">
        <span class="title">{props.title}</span>
      </div>
      {
        props.subTitle ? <span class="tips">{props.subTitle}</span> : null
      }
    </div>
  }
}