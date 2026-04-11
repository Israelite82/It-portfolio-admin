import React from "react";

export default function About() {
  return (
    <div className="min-h-screen w-full bg-[#FFF5E1]">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-[#071b34] to-[#06152b]">
        <div className="max-w-7xl mx-auto min-h-[250px] md:h-[350px] px-4 md:px-6 py-12 md:py-0 relative overflow-hidden">
          <div className="md:mt-20 max-w-3xl relative z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4">
              About
            </h1>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 top-[70%] md:left-auto md:right-0 md:top-1/2 md:-translate-y-[70%] md:translate-x-0 w-[200px] h-[120px] md:w-[340px] md:h-[200px] bg-gray-400/60 rounded-[50%]"></div>
        </div>
      </section>

      {/* Dr. Osaren Emokpae - FULL WIDTH, Image RIGHT, Text LEFT */}
      <div className="w-full">
        <div className="flex flex-col md:flex-row w-full">
          {/* Text Left */}
          <div className="md:w-1/2 bg-white p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Dr. Osaren Emokpae
            </h1>
            <p className="text-[#6B0F1A] text-lg mb-4">
              A Development Economist
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Dr. Osaren Emokpae is a distinguished scholar, global apostle, serial investor, and an accomplished management and marketing consultant whose impact spans across academia, ministry, corporate leadership, and philanthropy. A man of uncommon insight, he brings together a rare blend of expertise in Development Economics, Theology, organizational leadership, production management, strategic planning, organizational performance management, and microfinance banking.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              He is the acclaimed author of The Pilgrims Testament, The Great Expectation and Minimum to Maximum, and co-author of Guilty or Not Guilty and The Glory in Stewardship. His extensive academic background includes pioneering research on the roles of banks in economic development and structural adjustment programs at the Universities of Lagos and Calabar. He further explored Human Resource Management and Organizational Resilience in Microfinance during his doctoral studies at the Universities of Century and Hertfordshire.
            </p>
            <p className="text-gray-700 leading-relaxed">
              He is blissfully married to Imose Enoma Osar-Emokpae, a Linguist, Educationist, and Philanthropist. They are blessed with wonderful children and grandchildren.
            </p>
          </div>
          {/* Image Right */}
          <div className="md:w-1/2 bg-gray-300 flex items-center justify-center min-h-[500px]">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-400 rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Dr. Osaren Emokpae</p>
            </div>
          </div>
        </div>
      </div>

      {/* Biography Card - text only, card style */}
      <div className="w-full px-4 md:px-12 py-12">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 max-w-6xl mx-auto">
          <p className="text-gray-700 leading-relaxed">
            {/* Biography text here - appears to be same as above or additional? */}
          </p>
        </div>
      </div>

      {/* Academic Biography - Two columns, Academic Profile on RIGHT */}
      <div className="w-full px-4 md:px-12 py-12">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Academic Biography</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left - Publications */}
            <div>
              <h3 className="font-semibold text-[#6B0F1A] text-lg mb-3">Publications</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>PhD in Organizational Resilience in Microfinance</li>
                <li>University of Hertfordshire</li>
              </ul>
            </div>
            {/* Right - Academic Profile */}
            <div>
              <h3 className="font-semibold text-[#6B0F1A] text-lg mb-3">Academic Profile</h3>
              <p className="text-gray-700">PhD in Human Resource Management</p>
              <p className="text-gray-700">University of Century</p>
            </div>
          </div>
        </div>
      </div>

      {/* Apostle Osaren Emokpae - FULL WIDTH, Image RIGHT, Text LEFT */}
      <div className="w-full">
        <div className="flex flex-col md:flex-row w-full">
          {/* Text Left */}
          <div className="md:w-1/2 bg-white p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Apostle. Osaren Emokpae</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A National Leader/General Overseer Emeritus of Foursquare Gospel Church Trinidad & Tobago and Guyana, Executive Counsellor Emeritus of Foursquare Nigeria, Dr. Emokpae now serves as the President and Presiding Apostle of Macedonia Call Global Assembly—a ministry with a powerful global vision.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The vision for Macedonia Call Global Assembly was birthed in his heart in 2008 while in Brixton, United Kingdom, within the Foursquare movement, and was later incorporated at The Summit in Columbia, USA. What began as a divine revelation has since grown into an independent global ministry committed to accelerating the discipling of nations in preparation for the return of our Savior.
            </p>
          </div>
          {/* Image Right */}
          <div className="md:w-1/2 bg-gray-300 flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-400 rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Apostle Osaren Emokpae</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section - Two columns */}
      <div className="w-full px-4 md:px-12 py-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Mission Statement</h2>
            <p className="text-gray-700 leading-relaxed">
              A National Leader/General Overseer Emeritus of Foursquare Gospel Church Trinidad & Tobago and Guyana, Executive Counsellor Emeritus of Foursquare Nigeria, Dr. Emokpae now serves as the President and Presiding Apostle of Macedonia Call Global Assembly—a ministry with a powerful global vision.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Vision Statement</h2>
            <p className="text-gray-700 leading-relaxed">
              The vision for Macedonia Call Global Assembly was birthed in his heart in 2008 while in Brixton, United Kingdom, within the Foursquare movement, and was later incorporated at The Summit in Columbia, USA. What began as a divine revelation has since grown into an independent global ministry committed to accelerating the discipling of nations in preparation for the return of our Savior.
            </p>
          </div>
        </div>
      </div>

      {/* A Track Record of Excellence */}
      <div className="w-full px-4 md:px-12 py-12">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">A Track Record of Excellence In The Market</h2>
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>Dr. Osaren Emokpae is a transformational force in Nigeria's marketing and communication landscape—recognized not just for his achievements, but for the institutions, people, and ideas he has helped build.</p>
            <p>His career spans major milestones, beginning with his role as Senior Brand Manager at Unilever, then Nigeria's largest multinational. He went on to serve as Secretary of the National Institute of Marketing, where he contributed to raising professional standards nationwide.</p>
            <p>A pioneer at heart, Dr. Emokpae coordinated the birth of the media independent practice in Nigeria and became the founding President of the Media Independent Practitioners Association of Nigeria (MPIAN). He also co-visited Media Planning Services (MPS) with George Thorpe—a research-driven initiative that strengthened accurate media planning and buying across the country.</p>
            <p>His leadership extended into corporate governance as a member of the Institute of Directors and as an Executive Director at Insight Communications and the Troyka Group. He later founded the Mindshare Group—Mindshare Communications and Mindshare Datatech—driving innovation across marketing, data, and strategy.</p>
            <p>Dr. Emokpae also made a defining impact in private broadcasting. He led teams that reshaped modern television in Nigeria, consulting for pioneers such as BDN and Silverbird Television, and supporting strategic projects—including enabling Alt to purchase OB Vans for the 1999 World Junior Football Championship.</p>
            <p>A builder of people and institutions, he founded Philip Business School, which evolved into the Ed-John Institute of Management and Technology—an NTBE-accredited institution producing globally competitive graduates. He also established the Ed-John College of Theology and Leadership Studies to nurture strong, ethical Christian leaders.</p>
            <p>Beyond marketing and education, Dr. Emokpae played a strategic role in advancing private security in Nigeria. He helped birth Halogen Security and founded Concorde Security and Omecom Security—organisations that today employ over 5,000 personnel. Through the Havilah Group, his enterprises collectively support over 7,000 employees nationwide.</p>
            <p>Across every sector he touches, Dr. Osaren Emokpae stands out as a visionary nation-builder—raising leaders, shaping industries, and leaving behind institutions that continue to impact lives.</p>
            <p>Dr. Emokpae served as Chairman of LAPO NGO and leads the Rhema Global Foundation. He is also a board member at McPherson University, Havilah Open Door, and the Institute of Leadership and Future Studies, where he teaches Organizational Leadership. He is the Founder of the ED-John Institute of Management and Technology, where he helps young people and professionals develop practical skills in ICT, Robotics, AI, Business, and Entrepreneurship. Over the years, he has also founded and led several impactful organizations, including Mindshare Group, Concorde Security and Protocol Services (UK), Concorde Express, and the Philips School of Fullology and Leadership Research.</p>
          </div>
        </div>
      </div>

      {/* Top Skills */}
      <div className="w-full px-4 md:px-12 py-12 pb-20">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Top Skills</h2>
          <div className="flex flex-wrap gap-3">
            <span className="bg-[#6B0F1A]/10 text-[#6B0F1A] px-4 py-2 rounded-full text-sm font-medium">Mentoring</span>
            <span className="bg-[#6B0F1A]/10 text-[#6B0F1A] px-4 py-2 rounded-full text-sm font-medium">Strategic planning</span>
            <span className="bg-[#6B0F1A]/10 text-[#6B0F1A] px-4 py-2 rounded-full text-sm font-medium">Christian Leadership</span>
            <span className="bg-[#6B0F1A]/10 text-[#6B0F1A] px-4 py-2 rounded-full text-sm font-medium">Economic Development</span>
            <span className="bg-[#6B0F1A]/10 text-[#6B0F1A] px-4 py-2 rounded-full text-sm font-medium">Managing Organisational Performance</span>
          </div>
        </div>s
      </div>
    </div>
  );
}