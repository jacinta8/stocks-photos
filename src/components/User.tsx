import "./User.css"

export type User = {
  urls: { regular: string }
  user: {
    name: string
    portfolio_url: string
    profile_image: { medium: string }
  }
  likes: number
  id: string
}

const User = ({ user }: { user: User }) => {
  // urls: { regular },
  // alt_description,
  // likes,
  // user: {
  //   name,
  //   portfolio_url,
  //   profile_image: { medium },
  // },

  return (
    <article>
      <img src={user.urls.regular} alt={user.user.name} />
      <div className="user-info">
        <div>
          <h4>{user.user.name}</h4>
          <p>{user.likes} likes</p>
        </div>

        <a href={user.user.portfolio_url}>
          <img
            src={user.user.profile_image.medium}
            alt={user.user.name}
            className="user-img"
          />
        </a>
      </div>
    </article>
  )
}
export default User
