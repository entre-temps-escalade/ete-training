import Shell from '@/components/Shell'

function Dashboard() {
    //TODO: sidebar responsive

    return (
        <Shell>dashboard</Shell>
        // <section className="bg-gray-50 dark:bg-gray-900 flex">
        //     <nav className="flex flex-col items-center h-screen bg-white border-r w-64 dark:bg-gray-800 dark:border-gray-700 py-5">
        //         <a href="/" className="flex flex-col items-center">
        //             <img
        //                 className="w-20 h-20"
        //                 src={theme === 'dark' ? '/ete.png' : '/ete-dark.png'}
        //                 alt="logo"
        //             />
        //             <h1 className="text-2xl dark:text-white font-bold mt-1">
        //                 ETE Training
        //             </h1>
        //         </a>
        //         <div className="mx-5 mt-6">
        //             <Select
        //                 placeholder={useTranslate('choose_climber')}
        //                 leftSection={<Users />}
        //                 data={[
        //                     { label: 'Théo Posty', value: '0' },
        //                     { label: 'Elouan Boiteux', value: '1' },
        //                     { label: 'Alannah Auclair', value: '2' },
        //                 ]}
        //                 onChange={(value) => console.log(value)}
        //             />
        //         </div>
        //     </nav>
        //     <div className="h-screen">Navbar</div>
        // </section>
    )
}

export default Dashboard
