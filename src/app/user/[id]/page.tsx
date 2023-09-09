const ProfilePage = ({ params }: { params: { id: string } }) => {
    return (
        <div>
        <h1>プロフィールページ</h1>
        <p>ユーザーID: {params.id}</p>
        </div>
    );
}

export default ProfilePage