import React, { useState } from 'react'
import './Technical.css'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import processorImage from '../../asserts/processor.png'
import osImage from '../../asserts/os1.png'
import ramImage from '../../asserts/ram.png'
import romImage from '../../asserts/rom.png'
import graphicsImage from '../../asserts/graphicsCard.png'
import integratedgraphicsImage from '../../asserts/inregratedGraphics.png'
import dedicatedGraphicsImage from '../../asserts/dedicatedGraphics.png'
import hddImage from '../../asserts/hdd.png'
import ssdImage from '../../asserts/ssd.png'
import technicalImage from '../../asserts/technical.png'

export default function Technical() {
    const [value, setValue] = useState('ram');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [graphicsValue, setGraphicsValue] = useState('integrated');
    const handleGraphicsChange = (event, newValue) => {
        setGraphicsValue(newValue);
    };
    const [storageValue, setStorageValue] = useState('hdd');
    const handleStorageChange = (event, newValue) => {
        setStorageValue(newValue);
    };
    function scrollTo(id) {
        if (id === 'ram' || id === 'rom') {
            setValue(id);
            const scrollToSection = document.querySelector(`#ram-rom`);
            scrollToSection.scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            });
            return;
        }
        if (id === 'hdd' || id === 'ssd') {
            setStorageValue(id);
            const scrollToSection = document.querySelector(`#hdd-ssd`);
            scrollToSection.scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            });
            return;
        }
        const scrollToSection = document.querySelector(`#${id}`);
        scrollToSection.scrollIntoView({
            behavior: 'smooth',
            block: 'end'
        });
    }
    return (
        <section className='technical'>
            <div className="left" style={{ backgroundImage: `url(${technicalImage})` }}>
                <div className="left-content">
                    <h1>technical page</h1>
                    <p className='description'>welcome to technical page, here we can help you with any technical details about mobiles and laptops.</p>
                    <p className='description'>in this page you will find technical details about:</p>
                    <ul>
                        <li><button onClick={() => scrollTo('processor')} >processor</button></li>
                        <li><button onClick={() => scrollTo('operatingSystem')} >operating system</button></li>
                        <li><button onClick={() => scrollTo('ram')} >ram</button></li>
                        <li><button onClick={() => scrollTo('rom')} >rom</button></li>
                        <li><button onClick={() => scrollTo('graphicsCard')} >graphics card</button></li>
                        <li><button onClick={() => scrollTo('hdd')} >hdd</button></li>
                        <li><button onClick={() => scrollTo('ssd')} >ssd</button></li>
                    </ul>
                </div>
            </div>
            <div className="right" id='processor' style={{ backgroundImage: `url(${processorImage})` }}>
                <div className="right-content">
                    <h1>processor</h1>
                    <p className='description'>Processors, also known as central processing units (CPUs), are the primary components of a computer responsible for executing instructions from programs and performing basic arithmetic, logic, control, and input/output operations. They function as the brain of the computer, interpreting and carrying out commands. Modern processors feature multiple cores, allowing for parallel processing and improved performance. Key characteristics of processors include clock speed, core count, cache size, and architecture type. Innovations in processor technology drive advancements in computing power, efficiency, and capability across a wide range of devices, from smartphones to supercomputers.</p>
                    <p>for more technical details: </p>
                    <p>English: <a href="https://www.youtube.com/watch?v=7yKycb4e7Z0" target='_blank' rel="noreferrer">https://www.youtube.com/watch?v=7yKycb4e7Z0</a></p>
                    <p>Arabic: <a href="https://www.youtube.com/watch?v=QpFM5SBGwCw" target='_blank' rel="noreferrer">https://www.youtube.com/watch?v=QpFM5SBGwCw</a></p>
                </div>
            </div>
            <div className="left" id='operatingSystem' style={{ backgroundImage: `url(${osImage})` }}>
                <div className="left-content">
                    <h1>operating system</h1>
                    <p className='description'>An operating system (OS) is software that manages computer hardware, software resources, and provides common services for computer programs. It serves as an intermediary between users and the computer hardware, enabling the execution of applications and managing tasks such as memory allocation, process scheduling, and input/output operations. Examples of popular operating systems include:</p>
                    <ul>
                        <li><span>Windows:</span> Developed by Microsoft, commonly used in personal computers.</li>
                        <li><span>macOS:</span> Developed by Apple, used in Macintosh computers.</li>
                        <li><span>Linux:</span> An open-source OS, widely used in servers, desktops, and embedded systems.</li>
                        <li><span>Android:</span> Developed by Google, based on Linux, used in smartphones and tablets.</li>
                        <li><span>iOS:</span> Developed by Apple, used in iPhones and iPads.</li>
                    </ul>
                    <p>for more technical details: </p>
                    <p>English: <a href="https://www.youtube.com/watch?v=ACsLvXuaKxw" target='_blank' rel="noreferrer">https://www.youtube.com/watch?v=ACsLvXuaKxw</a></p>
                    <p>Arabic: <a href="https://www.youtube.com/watch?v=3mpIJH5PyKE" target='_blank' rel="noreferrer">https://www.youtube.com/watch?v=3mpIJH5PyKE</a></p>                </div>
            </div>
            <div className="white-comparison" id='ram-rom'>
                <BottomNavigation className='comparison-container' value={value} onChange={handleChange}>
                    <BottomNavigationAction
                        label="ram"
                        value="ram"
                        showLabel
                        className='comparison-item'
                    />
                    <BottomNavigationAction
                        label="rom"
                        value="rom"
                        showLabel
                        className='comparison-item'
                    />
                </BottomNavigation>
                {value === 'ram' ?
                    <div className={`right right-comparison`} style={{ backgroundImage: `url(${ramImage})` }}>
                        <div className="right-content">
                            <h1>ram</h1>
                            <p className='description'>Random Access Memory (RAM) is a type of volatile memory used in computers and other devices to store data that is actively being used or processed. RAM allows data to be read and written quickly in any order, providing the fast access necessary for running applications, processing tasks, and ensuring smooth system performance. Unlike long-term storage (such as hard drives or SSDs), data in RAM is lost when the device is powered off. The amount of RAM in a system can significantly impact its speed and multitasking capabilities.</p>
                            <p>English: <a href="https://www.youtube.com/watch?v=-aQOv3T7P8E" target='_blank' rel="noreferrer">https://www.youtube.com/watch?v=-aQOv3T7P8E</a></p>
                            <p>Arabic: <a href="https://www.youtube.com/watch?v=mpsGEJ5hI9w" target='_blank' rel="noreferrer">https://www.youtube.com/watch?v=mpsGEJ5hI9w</a></p>                        </div>
                    </div>
                    :
                    <div className={`right right-comparison`} style={{ backgroundImage: `url(${romImage})` }}>
                        <div className="right-content">
                            <h1>rom</h1>
                            <p className='description'>Read-Only Memory (ROM) is a type of non-volatile memory used in computers and other electronic devices to store firmware and software that is rarely changed, such as the system's BIOS or bootloader. Unlike RAM, the data in ROM remains intact even when the device is powered off. ROM is used to hold essential instructions for the system's initial boot process and hardware initialization. While traditional ROM is programmed during manufacturing and cannot be modified, more modern variants like EEPROM and flash memory allow for reprogramming to update firmware.</p>
                            <p>English: <a href="https://www.youtube.com/watch?v=I_ghg3hiUR4" target='_blank' rel="noreferrer">https://www.youtube.com/watch?v=I_ghg3hiUR4</a></p>
                            <p>Arabic: <a href="https://www.youtube.com/watch?v=VZQy779P4xg" target='_blank' rel="noreferrer">https://www.youtube.com/watch?v=VZQy779P4xg</a></p>                        </div>
                    </div>
                }
            </div>
            <div className="black-comparison" id='hdd-ssd'>
                <div className="black-comparison-content">
                    <BottomNavigation className='comparison-container' value={storageValue} onChange={handleStorageChange}>
                        <BottomNavigationAction
                            label="hdd"
                            value="hdd"
                            showLabel
                            className='comparison-item'
                        />
                        <BottomNavigationAction
                            label="ssd"
                            value="ssd"
                            showLabel
                            className='comparison-item'
                        />
                    </BottomNavigation>
                </div>
                {storageValue === 'hdd' ?
                    <div className={`left left-comparison`} style={{ backgroundImage: `url(${hddImage})` }}>
                        <div className="left-content">
                            <h1>hdd</h1>
                            <p className='description'>A Hard Disk Drive (HDD) is a traditional storage device used in computers and other electronic devices to store and retrieve digital information. HDDs use magnetic storage to read and write data. They have been a staple in data storage since their invention in the 1950s, evolving significantly in terms of capacity, reliability, and cost-effectiveness. Despite the rise of Solid State Drives (SSDs), HDDs remain popular for their large storage capacities and affordability, making them ideal for bulk storage and archival purposes.</p>
                            <p>English: <a href="https://www.youtube.com/watch?v=wteUW2sL7bc" target='_blank' rel="noreferrer">https://www.youtube.com/watch?v=wteUW2sL7bc</a></p>
                            <p>Arabic: <a href="https://www.youtube.com/watch?v=PiCSonxAJw8" target='_blank' rel="noreferrer">https://www.youtube.com/watch?v=PiCSonxAJw8</a></p>                        </div>
                    </div>
                    :
                    <div className={`left left-comparison`} style={{ backgroundImage: `url(${ssdImage})` }}>
                        <div className="left-content">
                            <h1>ssd</h1>
                            <p className='description'>A Solid State Drive (SSD) is a type of storage device that uses integrated circuit assemblies to store data persistently, typically using flash memory. Unlike traditional hard disk drives (HDDs), SSDs have no moving parts, which leads to several advantages in terms of performance, reliability, and durability.</p>
                            <p>English: <a href="https://www.youtube.com/watch?v=aa5l8uof_j0" target='_blank' rel="noreferrer">https://www.youtube.com/watch?v=aa5l8uof_j0</a></p>
                            <p>Arabic: <a href="https://www.youtube.com/watch?v=PiCSonxAJw8" target='_blank' rel="noreferrer">https://www.youtube.com/watch?v=PiCSonxAJw8</a></p>                        </div>
                    </div>
                }
            </div>
            <div className="right" id='graphicsCard' style={{ backgroundImage: `url(${graphicsImage})` }}>
                <div className="right-content">
                    <h1>graphics card</h1>
                    <p className='description'>A graphics card is essential for handling and accelerating graphics rendering in a computer. It includes a GPU, VRAM, and cooling systems, with performance varying by clock speed, memory capacity, and processing cores. There are integrated and dedicated graphics cards, with the latter offering higher performance for demanding applications like gaming and professional graphics work.</p>
                    <p>for more technical details: </p>
                    <p>English: <a href="https://www.youtube.com/watch?v=Kgcfj_KV-mo" target='_blank' rel="noreferrer">https://www.youtube.com/watch?v=Kgcfj_KV-mo</a></p>
                    <p>Arabic: <a href="https://www.youtube.com/watch?v=_QEMAkIg1lo" target='_blank' rel="noreferrer">https://www.youtube.com/watch?v=_QEMAkIg1lo</a></p>
                </div>
            </div>
            <div className="white-comparison">
                <BottomNavigation className='comparison-container' value={graphicsValue} onChange={handleGraphicsChange}>
                    <BottomNavigationAction
                        label="Integrated Graphics"
                        value="integrated"
                        showLabel
                        className='comparison-item'
                    />
                    <BottomNavigationAction
                        label="Dedicated (Discrete) Graphics"
                        value="dedicated"
                        showLabel
                        className='comparison-item'
                    />
                </BottomNavigation>
                {graphicsValue === 'integrated' ?
                    <div className={`right right-comparison`} style={{ backgroundImage: `url(${integratedgraphicsImage})` }}>
                        <div className="right-content">
                            <h1>integrated graphics</h1>
                            <ul>
                                <li>Built into the CPU.</li>
                                <li>Shares system memory.</li>
                                <li>Suitable for basic tasks like web browsing, office applications, and media playback.</li>
                                <li>Examples: Intel UHD Graphics, AMD Radeon Vega.</li>
                            </ul>
                        </div>
                    </div>
                    :
                    <div className={`right right-comparison`} style={{ backgroundImage: `url(${dedicatedGraphicsImage})` }}>
                        <div className="right-content">
                            <h1>dedicated graphics</h1>
                            <p className='description'>Separate component installed in a PCIe slot, Has its own GPU and VRAM, Higher performance for gaming, video editing, and 3D rendering, Subcategories:</p>
                            <ul>
                                <li><span>Consumer/Gaming Graphics Cards:</span> High performance for gaming and general use, like NVIDIA GeForce RTX series, AMD Radeon RX series.</li>
                                <li><span>Professional Graphics Cards:</span> Optimized for professional applications like 3D rendering and CAD, like NVIDIA Quadro series, AMD Radeon Pro series.</li>
                                <li><span>Workstation Graphics Cards:</span> Designed for scientific calculations, simulations, and AI development, like NVIDIA Tesla, AMD Radeon Instinct.</li>
                                <li><span>Entry-Level Graphics Cards:</span> Developed by Google, based on Linux, used in smartphones and tablets.Affordable and suitable for casual gaming and media consumption, like NVIDIA GeForce GT series, AMD Radeon RX 550.</li>
                                <li><span>External Graphics Cards (eGPUs):</span> External devices that house a dedicated GPU, connecting via Thunderbolt 3 or USB-C.</li>
                            </ul>
                        </div>
                    </div>
                }
            </div>
        </section >
    )
}
